import { run } from "aoc-framework";

run(
	(input) => {
		let current = 50;
		let sum = 0;

		for (const line of input) {
			const direction = line[0];
			const amount = parseInt(line.slice(1), 10) % 100;

			if (direction === "R") {
				current += amount;
				if (current > 99) current = current - 100;
			} else if (direction === "L") {
				current -= amount;
				if (current < 0) current = 100 + current;
			} else throw new Error("This should not have happened");

			if (current === 0) sum++;
		}

		return sum;
	},
	{ inputMode: "lines" },
);
