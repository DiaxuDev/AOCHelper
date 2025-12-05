import { run } from "aoc-framework";

run(
	(input) => {
		const parts = input.split("\n\n");
		let sum = 0;

		const ranges = parts[0].split("\n").map((line) => line.split("-").map(Number));
		const products = parts[1].split("\n").map(Number);

		for (const product of products) {
			if (ranges.some((range) => product >= range[0] && product <= range[1])) sum++;
		}

		return sum;
	},
	{ inputMode: "raw" },
);
