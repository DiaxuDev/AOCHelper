import run from "../../run.js";

run(
	input => {
		return input
			.map(line => {
				line = line.replace(/[^0-9]/gi, "");
				return parseInt(line[0] + line[line.length - 1], 10);
			})
			.reduce((a, b) => a + b);
	},
	1,
	1
);
