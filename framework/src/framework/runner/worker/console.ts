import { Console } from "node:console";
import { Writable } from "node:stream";

import { WorkerMessage } from "./types";

export function createCustomConsole() {
	const stdout = new Writable({
		write(chunk, _encoding, callback) {
			process.send?.({ type: "stdout", data: chunk.toString() } as WorkerMessage);
			callback();
		},
	});

	const stderr = new Writable({
		write(chunk, _encoding, callback) {
			process.send?.({ type: "stderr", data: chunk.toString() } as WorkerMessage);
			callback();
		},
	});

	return new Console({ stdout, stderr });
}
