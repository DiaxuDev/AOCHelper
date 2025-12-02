import { run } from "aoc-framework";

// WARNING! This script is broken as fuck and it's left here only for historical purposes.
// This code incorrectly adds a point when the current was at 0 and moves to a value below 0 or above 99
// I have no idea how I managed to get the right answer with this piece of shit
// Maybe I'm just the chosen one
// Anyhow I think that fixing it would be altering the history and I don't want to do that so I'm leaving it as is
// Just be aware that you have maybe 1% chance or even lower getting the right answer with that

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
