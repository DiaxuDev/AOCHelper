import { run } from "aoc-framework";

run(
	(input) => {
		const left: number[] = [],
			right: number[] = [];

		for (const line of input) {
			const val = line.split("   ");

			left.push(parseInt(val[0], 10));
			right.push(parseInt(val[1], 10));
		}

		left.sort();
		right.sort();

		let sum = 0;

		for (const i in left) {
			const l = left[i];
			const r = right[i];

			sum += Math.abs(r - l);
		}

		// simulate long computation
		for (let i = 0; i < 6_000_000_000; i++) {}

		return sum;
	},
	{ inputMode: "lines" },
);
