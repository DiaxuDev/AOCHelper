import { run } from "aoc-framework";

run(
	(input) => {
		const matrix = input.map((line) => line.split(""));

		const CHAR_EMPTY = ".";
		const CHAR_TAKEN = "@";

		let sum = 0;
		let modified = false;

		do {
			modified = false;

			for (let y = 0; y < matrix.length; y++) {
				const line = matrix[y];

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

					if (taken < 4) {
						modified = true;
						matrix[y][x] = CHAR_EMPTY;
						sum++;
					}
				}
			}
		} while (modified);

		function isTaken(x: number, y: number): boolean {
			return matrix[y]?.[x] === CHAR_TAKEN;
		}

		return sum;
	},
	{ inputMode: "lines" },
);
