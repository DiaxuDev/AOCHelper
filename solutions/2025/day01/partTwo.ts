import { run } from "aoc-framework";

run(
	(input) => {
		let current = 50;
		let sum = 0;

		for (const line of input) {
			const direction = line[0];
			const amount = parseInt(line.slice(1), 10);
			const modulo = amount % 100;

			sum += Math.floor(amount / 100);

			if (direction === "R") {
				current += modulo;
				if (current > 99) {
					sum++;
					current = current - 100;
				}
			} else if (direction === "L") {
				current -= modulo;
				if (current < 0) {
					sum++;
					current = 100 + current;
				}
			} else throw new Error("This should not have happened");
		}

		return sum;
	},
	{ inputMode: "lines" },
);
