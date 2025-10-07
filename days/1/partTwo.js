import run from "../../run.js";

run(
	(input) => {
		const left = [],
			right = [];

		for (const line of input) {
			const val = line.split("   ");

			left.push(parseInt(val[0]));
			right.push(parseInt(val[1]));
		}

		let sum = 0;

		for (const l of left) {
			const similarity = right.filter((r) => r === l).length;

			sum += l * similarity;
		}

		return sum;
	},
	1,
	2
);
