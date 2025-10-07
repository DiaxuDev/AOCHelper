import run from "../../run.js";

run(
	(input) => {
		input = input[0].split(" ").map(Number);

		for (let i = 0; i < 25; i++) {
			input = input.flatMap((val) => {
				if (val === 0) return 1;
				if (val.toString().length % 2 === 0) {
					const stringified = val.toString();
					return [
						parseInt(stringified.substring(0, stringified.length / 2)),
						parseInt(stringified.substring(stringified.length / 2)),
					];
				}
				return val * 2024;
			});
		}

		return input.length;
	},
	11,
	1,
	false
);
