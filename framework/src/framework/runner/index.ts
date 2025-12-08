import { RunOptions } from "@/types";

import { RunnerState } from "./worker/run";

let ctx: RunnerState;

export function setRunnerState(state: RunnerState) {
	ctx = state;
}

type RunCtx = {
	/** Whether function is running in test mode or real mode */
	test: boolean;
};

type InputType<T extends RunOptions["inputMode"]> = T extends "raw"
	? string
	: T extends "lines"
		? string[]
		: T extends "numberLines"
			? number[]
			: string[];

export function run<T extends RunOptions["inputMode"] = "lines">(
	fn: (input: InputType<T>, ctx: RunCtx) => number,
	options?: RunOptions & { inputMode: T },
) {
	if (!ctx || ctx.input === null || ctx.testMode === null) {
		throw new Error("Runner context is not set or values are missing.");
	}

	let input: string | string[] | number[];

	switch (options?.inputMode) {
		case "lines":
			input = ctx.input.split("\n");
			break;
		case "numberLines":
			input = ctx.input.split("\n").map((line) => parseInt(line, 10));
			break;
		case "raw":
		default:
			input = ctx.input;
			break;
	}

	const answer = fn(input as InputType<T>, { test: ctx.testMode });
	ctx.answer = answer;
}
