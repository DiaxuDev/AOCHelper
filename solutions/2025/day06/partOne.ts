import { run } from "aoc-framework";

run(
	(input) => {
		let sum = 0;
		let columns: number[][] = [];

		for (const line of input) {
			const parts = line.trim().split(/\s+/);

			for (let i = 0; i < parts.length; i++) {
				const part = parts[i];
				if (part === "+") sum += columns[i].reduce((prev, curr) => prev + curr, 0);
				else if (part === "*") sum += columns[i].reduce((prev, curr) => prev * curr, 1);
				else {
					columns[i] ??= [];
					columns[i].push(parseInt(part, 10));
				}
			}
		}

		return sum;
	},
	{ inputMode: "lines" },
);
