import { createCustomConsole } from "./console";
import { setupState } from "./run";
import { WorkerMessage, WorkerRequest } from "./types";

export function setupWorker() {
	globalThis.console = createCustomConsole();
	setupState();

	process.on("message", onMessage);

	process.send?.({ type: "started" } as WorkerMessage);
}

function onMessage(message: WorkerRequest) {}
