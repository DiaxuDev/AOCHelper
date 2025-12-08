import { pathToFileURL } from "node:url";
import { createJiti, type Jiti } from "jiti";

import { assert } from "@/framework/utils";

import { setRunnerState } from "..";
import { WorkerRunData } from "./types";

export type RunnerState = {
	testMode: boolean | null;
	input: string | null;
	answer: number | null;
};

let jiti: Jiti | undefined;
const state: RunnerState = { input: null, answer: null, testMode: null };

export function setupRunner(ctx: { basePath: string }) {
	setRunnerState(state);
	jiti = createJiti(pathToFileURL(ctx.basePath).href, {
		moduleCache: false,
	});
}

export async function run(data: WorkerRunData): Promise<number> {
	assert(jiti, "Runner.run:jiti");

	state.testMode = data.testMode;
	state.input = data.input;
	state.answer = null;

	try {
		await jiti.import(data.path);
	} catch (error) {
		console.log("Error during execution:", error);
		return 0;
	}

	assert(state.answer !== null, "Runner.run:answer");
	return state.answer;
}
