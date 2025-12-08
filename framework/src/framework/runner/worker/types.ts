export type WorkerRunData = {
	input: string;
	path: string;
	testMode: boolean;
};

export type WorkerRequest =
	| {
			type: "start";
			ctx: { basePath: string };
	  }
	| {
			type: "run";
			data: WorkerRunData;
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
