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
	private runningPromise?: Promise<void>;

	constructor(ctx: Framework, puzzle: PuzzleIdentifier) {
		this.ctx = ctx;
		this.testMode = ctx.config.defaultRunMode === "test";
		this.puzzle = puzzle;
		this.path = join(
			`day${this.puzzle.day.toString().padStart(2, "0")}`,
			`./part${this.puzzle.part === 1 ? "One" : "Two"}.ts`,
		);
	}

	public async init() {
		if (this.state === RunnerState.STARTED || this.state === RunnerState.RUNNING) return;

		this.state = RunnerState.STARTING;
		this.worker ||= fork(resolve(DIST_DIR, "worker.js"));

		this.ctx.addExitHook(() => this.worker?.kill());

		this.worker.send({ type: "start", ctx: { basePath: this.ctx.ensureEffectiveRoot() } } as WorkerRequest);

		// TODO: I should probably add a timeout to this
		await Promise.all([this.awaitStart(), this.loadInput()]);
		this.state = RunnerState.STARTED;
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

		// Prevent multiple runs at the same time
		if (this.runningPromise) await this.runningPromise;

		this.runningPromise = (async () => {
			assert(this.worker, "Runner.runingPromise:worker");

			let interval: NodeJS.Timeout | undefined;

			try {
				this.state = RunnerState.RUNNING;
				this.startedAt = performance.now();
				this.ctx.logger.updateStatusLine();

				interval = setInterval(() => this.ctx.logger.updateStatusLine(), 100).unref();

				const msg: WorkerRequest = { type: "run", data: { input: this.input!, path: "./" + this.path } };
				this.worker.send(msg);

				const resultPromise = new Promise<number>((resolve) => {
					const onFinish = (message: WorkerMessage) => {
						if (message.type !== "finished") return;

						this.worker?.removeListener("message", onFinish);
						resolve(message.answer);
					};

					this.worker?.addListener("message", onFinish);
				});

				this.answer = await resultPromise;
			} catch (error) {
				this.ctx.logger.error("Error during puzzle execution:", error);
			} finally {
				if (interval) {
					clearInterval(interval);
					interval = undefined;
				}

				this.state = RunnerState.STARTED;
				this.ctx.logger.updateStatusLine();
				this.startedAt = 0; // We have to defer unsetting startedAt because status line depends on it
			}
		})().finally(() => {
			this.runningPromise = undefined;
		});

		await this.runningPromise;
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
