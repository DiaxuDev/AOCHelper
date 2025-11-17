export type WorkerRequest = {
	input: string;
	path: string;
};

export type WorkerMessage =
	| {
			type: "started";
	  }
	| {
			type: "stdout" | "stderr";
			data: string;
	  }
	| { type: "finished"; answer: number };
