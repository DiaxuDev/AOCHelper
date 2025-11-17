import { existsSync, FSWatcher, mkdirSync } from "node:fs";
import { copyFile, mkdir, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { PuzzleIdentifier, type AOCConfig } from "@/types";
import { watch } from "chokidar";

import { Logger } from "@/framework/logger";

import { BASE_URL, DIST_DIR, USER_AGENT } from "./constants";
import { Runner } from "./runner/runner";

export class Framework {
	public logger: Logger;
	public config: AOCConfig;
	private exitHooks: Array<() => void> = [];
	public keepAlive: boolean = false;
	public runner?: Runner;

	constructor({ config }: { config: AOCConfig }) {
		this.config = config;
		this.logger = new Logger(this);
	}

	public async fetch(path: string, options?: RequestInit) {
		const opt = {
			method: "GET",
			headers: {
				cookie: `session=${this.config.token};`,
				"User-Agent": USER_AGENT,
				...options?.headers,
			},
			...options,
		};

		return await fetch(new URL(path, BASE_URL), opt);
	}

	public async bootstrap(day: number) {
		if (!Number.isInteger(day) || day < 1 || day > 25) {
			this.logger.error("Day must be an integer between 1 and 25");
			return;
		}

		const effectiveRoot = this.ensureEffectiveRoot();
		const path = join(effectiveRoot, `day${day.toString().padStart(2, "0")}`);

		if (existsSync(path)) {
			this.logger.log(`Day ${day} already exists at ${path}. Nothing to do. Exitting...`);
			return;
		}

		await mkdir(path);
		this.logger.log(`Created directory: ${path}`);

		const inputResponse = await this.fetch(`/${this.config.year}/day/${day}/input`);
		if (!inputResponse.ok) {
			this.logger.error(`Failed to fetch input for day ${day}. Status: ${inputResponse.status}`);
			return;
		}

		const input = await inputResponse.text();
		await writeFile(join(path, "input.txt"), input.trim());

		await copyFile(join(DIST_DIR, "templates/day.ts"), join(path, "partOne.ts"));
		await copyFile(join(DIST_DIR, "templates/day.ts"), join(path, "partTwo.ts"));

		this.logger.log(`Fetched and saved input`);
	}

	public async run(puzzle: PuzzleIdentifier, watchMode: boolean = false) {
		this.runner = new Runner(this, puzzle);
		await this.runner.init();

		if (watchMode) {
			// Prevent cli from exiting right away
			this.keepAlive = true;

			const watcher = watch(resolve(this.runner.getDir(), this.runner.path), {
				ignoreInitial: true,
				persistent: true,
			});

			watcher.on("change", () => {
				this.logger.log("File change detected, re-running...");

				if (!this.runner) {
					throw new Error("Watcher still running but runner instance is missing. This should not happen.");
				}

				this.runner.run();
			});

			this.addExitHook(() => {
				watcher.close();
				this.runner = undefined;
			});
		}

		await this.runner.loadInput();
		await this.runner.run();
		if (!watchMode) this.runner = undefined;
	}

	public ensureEffectiveRoot() {
		const effectiveRoot = join(this.config.root, this.config.year.toString());
		if (!existsSync(effectiveRoot)) mkdirSync(effectiveRoot, { recursive: true });
		return effectiveRoot;
	}

	public addExitHook(hook: () => void) {
		this.exitHooks.push(hook);
	}

	public exit() {
		this.exitHooks.forEach((hook) => hook());
	}
}
