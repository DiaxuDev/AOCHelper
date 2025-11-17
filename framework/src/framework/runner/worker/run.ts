import { setRunnerState } from "..";
import { WorkerRequest } from "./types";

export type RunnerState = {
	input: string | null;
	answer: number | null;
};

const state: RunnerState = { input: null, answer: null };
let isRunning = false;

export function setupState() {
	setRunnerState(state);
}

export async function run(data: WorkerRequest) {
	if (isRunning) state.input = data.input;
	state.answer = null;
}
