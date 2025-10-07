import run from "../../run.js";

run(
	(input) => {
		const left = [],
			right = [];

		for (const line of input) {
			const val = line.split("   ");

			left.push(val[0]);
			right.push(val[1]);
		}

		left.sort();
		right.sort();

		let sum = 0;

		for (const i in left) {
			const l = left[i];
			const r = right[i];

			sum += Math.abs(r - l);
		}

		return sum;
	},
	1,
	1,
	false
);
