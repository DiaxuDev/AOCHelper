import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { Framework, PuzzleIdentifier } from "@/index";
import { createJiti, Jiti } from "jiti";

import { setRunnerContext } from ".";
import { withBadge } from "../logger";
import { createCustomConsole } from "./worker/console";

export class Runner {
	private ctx: Framework;
	public puzzle: PuzzleIdentifier;
	public running: boolean = false;
	public startedAt: number = 0;
	public input?: string;
	public answer?: number;
	public fileName: string;
	public testMode;

	private jiti?: Jiti;
	private runningPromise?: Promise<void>;

	constructor(ctx: Framework, puzzle: PuzzleIdentifier) {
		this.ctx = ctx;
		this.testMode = ctx.config.defaultRunMode === "test";
		this.puzzle = puzzle;
		this.fileName = `./part${this.puzzle.part === 1 ? "One" : "Two"}.ts`;
		this.jiti = createJiti(pathToFileURL(this.getDir()).href, {
			moduleCache: false,
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
			assert(this.jiti, "Runner.runingPromise:jiti");

			const cleanup = this.setupEnvironment();
			let interval: NodeJS.Timeout | undefined;

			try {
				this.running = true;
				this.startedAt = performance.now();
				this.ctx.logger.updateStatusLine();

				interval = setInterval(() => this.ctx.logger.updateStatusLine(), 100).unref();

				await this.jiti.import(this.fileName);
			} catch (error) {
				this.ctx.logger.error("Error during puzzle execution:", error);
			} finally {
				if (interval) {
					clearInterval(interval);
					interval = undefined;
				}

				this.running = false;
				this.ctx.logger.updateStatusLine();
				this.startedAt = 0; // We have to defer unsetting startedAt because status line depends on it

				cleanup();
			}
		})().finally(() => {
			this.runningPromise = undefined;
		});

		await this.runningPromise;
	}

	public handleConsole(data: any, type: "stdout" | "stderr" = "stdout") {
		if (type === "stdout") this.ctx.logger.log(withBadge("yellow", "STDIN"), data);
		else this.ctx.logger.error(withBadge("magenta", "STDERR"), data);
	}

	public getDir() {
		const path = join(this.ctx.ensureEffectiveRoot(), `day${this.puzzle.day.toString().padStart(2, "0")}`);
		if (!existsSync(path)) {
			throw new Error(`Day ${this.puzzle.day} does not exist at path: ${path}`);
		}
		return path;
	}

	private setupEnvironment() {
		const console = globalThis.console;

		setRunnerContext(this);
		globalThis.console = createCustomConsole(this);

		const cleanup = () => {
			globalThis.console = console;
		};

		return cleanup;
	}
}

function assert(condition: any, source: string): asserts condition {
	if (!condition) {
		throw new Error(`Assertion from source ${source} failed. Was the environment set up correctly?`);
	}
}
