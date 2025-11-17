import { assert } from "@/framework/utils";

import { run, setupRunner } from "./run";
import { WorkerMessage, WorkerRequest } from "./types";

process.on("message", onMessage);

let isRunning = false;

async function onMessage(message: WorkerRequest) {
	switch (message.type) {
		case "start": {
			setupRunner(message.ctx);
			post({ type: "started" });

			break;
		}
		case "run": {
			if (isRunning) return;

			const result = await run(message.data);

			post({ type: "finished", answer: result });

			break;
		}
	}
}

function post(message: WorkerMessage) {
	assert(process.send, "Worker.process.send");
	process.send(message);
}
