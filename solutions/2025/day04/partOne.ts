import { run } from "aoc-framework";

run(
	(input) => {
		const CHAR_EMPTY = ".";
		const CHAR_TAKEN = "@";

		let sum = 0;

		for (let y = 0; y < input.length; y++) {
			const line = input[y];

			for (let x = 0; x < line.length; x++) {
				const char = line[x];
				if (char === CHAR_EMPTY) continue;

				let taken = 0;
				if (isTaken(x, y + 1)) taken++;
				if (isTaken(x + 1, y + 1)) taken++;
				if (isTaken(x + 1, y)) taken++;
				if (isTaken(x + 1, y - 1)) taken++;
				if (isTaken(x, y - 1)) taken++;
				if (isTaken(x - 1, y - 1)) taken++;
				if (isTaken(x - 1, y)) taken++;
				if (isTaken(x - 1, y + 1)) taken++;

				if (taken < 4) sum++;
			}
		}

		function isTaken(x: number, y: number): boolean {
			return input[y]?.[x] === CHAR_TAKEN;
		}

		return sum;
	},
	{ inputMode: "lines" },
);
