import { ChildProcess, fork } from "node:child_process";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { Framework, PuzzleIdentifier } from "@/index";

import { DIST_DIR } from "../constants";
import { WorkerMessage, WorkerRequest } from "./worker/types";

export enum RunnerState {
	IDLE,
	STARTING,
	STARTED,
	RUNNING,
}

export class Runner {
	private ctx: Framework;
	public puzzle: PuzzleIdentifier;
	public state: RunnerState = RunnerState.IDLE;
	public answer?: number;
	public startedAt: number = 0;
	private input?: string;
	public path: string;
	public testMode;

	private worker?: ChildProcess;
	private timerInterval?: NodeJS.Timeout;
	private resolveCompletionPromise?: () => void;

	constructor(ctx: Framework, puzzle: PuzzleIdentifier, testMode?: boolean) {
		this.ctx = ctx;
		this.puzzle = puzzle;
		this.path = join(
			`day${this.puzzle.day.toString().padStart(2, "0")}`,
			`./part${this.puzzle.part === 1 ? "One" : "Two"}.ts`,
		);

		if (testMode) {
			this.testMode = testMode;
		} else if (this.ctx.config.defaultRunMode === "auto") {
			this.testMode = this.ctx.keepAlive;
		} else {
			this.testMode = this.ctx.config.defaultRunMode === "test";
		}
	}

	public async init() {
		if (this.state === RunnerState.STARTED || this.state === RunnerState.RUNNING) return;

		this.state = RunnerState.STARTING;
		this.worker ||= fork(resolve(DIST_DIR, "worker.js"));

		this.ctx.addExitHook(() => this.worker?.kill());

		this.worker.on("message", this.onWorkerMessage.bind(this));

		this.worker.send({ type: "start", ctx: { basePath: this.ctx.ensureEffectiveRoot() } } as WorkerRequest);

		// TODO: I should probably add a timeout to this
		await this.awaitStart();
		this.state = RunnerState.STARTED;
	}

	private stop() {
		if (this.worker) {
			this.worker.kill();
			this.worker.removeAllListeners();
			this.worker = undefined;
		}

		if (this.timerInterval) {
			clearInterval(this.timerInterval);
			this.timerInterval = undefined;
		}

		this.state = RunnerState.IDLE;
	}

	private async awaitStart() {
		return new Promise<void>((resolve, reject) => {
			const onStart = (message: WorkerMessage) => {
				if (message.type !== "started") return;
				this.worker?.removeListener("message", onStart);
				resolve();
			};

			this.worker?.addListener("message", onStart);
		});
	}

	public async toggleTestMode(testMode?: boolean) {
		const newTestMode = testMode ?? !this.testMode;
		if (this.testMode === newTestMode) return;

		this.testMode = newTestMode;
		await this.loadInput();
		void this.run();
	}

	public async loadInput() {
		const fileName = this.testMode ? "input.test.txt" : "input.txt";
		const path = join(this.getDir(), fileName);
		if (!existsSync(path)) {
			throw new Error(`Input file does not exist at path: ${path}`);
		}
		this.input = await readFile(path, "utf-8");
	}

	public async run() {
		assert(this.input, "Runner.run:input");
		assert(this.worker, "Runner.run:worker");

		if (this.state === RunnerState.RUNNING) {
			this.stop();
			await this.init();
		}

		this.state = RunnerState.RUNNING;
		this.startedAt = performance.now();
		this.ctx.logger.updateStatusLine();

		this.timerInterval = setInterval(() => this.ctx.logger.updateStatusLine(), 100).unref();

		const msg: WorkerRequest = {
			type: "run",
			data: { input: this.input, path: "./" + this.path, testMode: this.testMode },
		};
		this.worker.send(msg);

		if (!this.ctx.keepAlive) {
			await new Promise<void>((resolve) => {
				this.resolveCompletionPromise = resolve;
			});
		}
	}

	private onWorkerMessage(message: WorkerMessage) {
		if (message.type !== "finished") return;

		this.answer = message.answer;

		if (this.timerInterval) {
			clearInterval(this.timerInterval);
			this.timerInterval = undefined;
		}

		this.state = RunnerState.STARTED;
		if (this.ctx.keepAlive) this.ctx.logger.updateStatusLine();
		else this.ctx.logger.log(this.ctx.logger.getStatusLine());
		this.startedAt = 0; // We have to defer unsetting startedAt because status line depends on it

		if (this.resolveCompletionPromise) {
			this.resolveCompletionPromise();
			this.resolveCompletionPromise = undefined;
		}
	}

	public getDir() {
		const path = join(this.ctx.ensureEffectiveRoot(), `day${this.puzzle.day.toString().padStart(2, "0")}`);
		if (!existsSync(path)) {
			throw new Error(`Day ${this.puzzle.day} does not exist at path: ${path}`);
		}
		return path;
	}
}

function assert(condition: any, source: string): asserts condition {
	if (!condition) {
		throw new Error(`Assertion from source ${source} failed. Was the environment set up correctly?`);
	}
}
