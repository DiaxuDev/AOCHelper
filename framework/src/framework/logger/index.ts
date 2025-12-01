import { Console } from "node:console";
import { createInterface, emitKeypressEvents, type Key } from "node:readline";
import c from "tinyrainbow";

import type { Framework } from "@/framework";

import {
	CLEAR_LINE,
	CLEAR_TO_END,
	CURSOR_TO,
	CURSOR_UP,
	HIDE_CURSOR,
	RESTORE_CURSOR,
	SAVE_CURSOR,
	SCROLLABLE_REGION,
	SHOW_CURSOR,
} from "../constants";
import { RunnerState } from "../runner/runner";
import { assert, formatTime } from "../utils";

export class Logger {
	private ctx: Framework;
	private stdout: NodeJS.WriteStream;
	private stderr: NodeJS.WriteStream;
	private console: Console;

	constructor(ctx: Framework, stdout = process.stdout, stderr = process.stderr) {
		this.ctx = ctx;
		this.stdout = stdout;
		this.stderr = stderr;
		this.console = new Console({ stdout: this.stdout, stderr: this.stderr });

		if (this.stdout.isTTY) {
			this.stdout.write(
				"\n" + HIDE_CURSOR + SAVE_CURSOR + SCROLLABLE_REGION(0, this.stdout.rows - 1) + RESTORE_CURSOR + CURSOR_UP(1),
			);

			this.updateStatusLine();

			if (this.ctx.keepAlive) ctx.addExitHook(() => this.log(c.red("Exiting...")));
		}
		this.registerExitHandlers();
		this.registerUnhandledRejectionHandler();
	}

	public log(...args: unknown[]) {
		this.console.log(...args);
	}

	public error(...args: unknown[]) {
		this.console.error(...args);
	}

	public updateStatusLine() {
		if (!this.stdout.isTTY || !this.ctx.runner) return;

		this.stdout.write(
			SAVE_CURSOR + CURSOR_TO(this.stdout.rows, 0) + this.getStatusLine() + CLEAR_TO_END + RESTORE_CURSOR,
		);
	}

	public getStatusLine(): string {
		assert(this.ctx.runner !== undefined, "Logger:getStatusLine");

		const icon = this.ctx.runner.state === RunnerState.RUNNING ? c.green("\u25B6") : c.dim("\u23F8");

		const time =
			(this.ctx.runner.state === RunnerState.RUNNING ? "Running for: " : "Completed in: ") +
			formatTime(performance.now() - this.ctx.runner.startedAt);

		const mode = this.ctx.runner.testMode ? c.yellow("Test mode") : c.blue("Real mode");

		const answer = this.ctx.runner.answer !== null ? "Answer: " + c.green(this.ctx.runner.answer) : "";

		return (
			(this.ctx.keepAlive ? icon + " " : "") + [time, mode, answer].filter((part) => part.length > 0).join(c.dim(" | "))
		);
	}

	private registerExitHandlers() {
		const cleanup = () => {
			if (this.stdout.isTTY) {
				this.stdout.write(
					SAVE_CURSOR +
						SCROLLABLE_REGION(0, this.stdout.rows) +
						CURSOR_TO(this.stdout.rows, 0) +
						CLEAR_LINE +
						RESTORE_CURSOR +
						SHOW_CURSOR,
				);
			}
		};

		const onExit = (code: number) => {
			cleanup();

			process.exitCode = code;
			process.exit();
		};

		process.on("exit", onExit);
		process.on("SIGINT", onExit);
		process.on("SIGTERM", onExit);

		this.ctx.addExitHook(() => {
			process.off("exit", onExit);
			process.off("SIGINT", onExit);
			process.off("SIGTERM", onExit);
			cleanup();
		});
	}

	private registerUnhandledRejectionHandler() {
		const onUnhandledRejection = (reason: unknown) => {
			process.exitCode = 1;
			this.console.error("Unhandled Rejection:", reason);
			this.stderr.write("\n\n");
			process.exit();
		};
		process.on("unhandledRejection", onUnhandledRejection);
		this.ctx.addExitHook(() => {
			process.off("unhandledRejection", onUnhandledRejection);
		});
	}
}

export function hijackTTY(ctx: Framework) {
	function onKeyPress(_str: string, key: Key) {
		if (key.name === "q" || (key.ctrl && key.name === "c")) {
			ctx.exit();
		} else if (key.name === "r") {
			ctx.logger.log("Restarting the current puzzle...");
			void ctx.runner?.run();
		} else if (key.name === "t") {
			void ctx.runner?.toggleTestMode();
		}
	}

	const rl = createInterface({
		input: process.stdin,
	});
	emitKeypressEvents(process.stdin, rl);
	process.stdin.on("keypress", onKeyPress);
	if (process.stdin.isTTY) process.stdin.setRawMode(true);

	return function cleanup() {
		rl.close();
		process.stdin.off("keypress", onKeyPress);
		if (process.stdin.isTTY) process.stdin.setRawMode(false);
	};
}

// I may or may not have stolen this from vitest
export function withBadge(
	color: "red" | "green" | "yellow" | "blue" | "magenta" | "cyan",
	badge: string,
	message?: string,
): string {
	const bg = `bg${color.charAt(0).toUpperCase()}${color.slice(1)}` as `bg${Capitalize<typeof color>}`;

	return `${c.bold(c[bg](` ${badge} `))} ${message ? c[color](message) : ""}`;
}
