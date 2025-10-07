import run from "../../run.js";

run(
	(input) => {
		let score = 0;

		for (let y = 0; y < input.length; y++) {
			for (let x = 0; x < input[0].length; x++) {
				if (input[y][x] === "0") {
					score += traverse(x, y);
				}
			}
		}

		return score;

		function traverse(x, y) {
			const curr = parseInt(input[y][x]);

			if (curr === 9) return 1;

			let trails = 0;

			// Check top
			if (y > 0 && Number(input[y - 1][x]) - 1 === curr) {
				const next = traverse(x, y - 1);

				trails += next;
			}

			// Check right
			if (x < input[0].length - 1 && Number(input[y][x + 1]) - 1 === curr) {
				const next = traverse(x + 1, y);

				trails += next;
			}

			// Check bottom
			if (y < input.length - 1 && Number(input[y + 1][x]) - 1 === curr) {
				const next = traverse(x, y + 1);

				trails += next;
			}

			// Check left
			if (x > 0 && Number(input[y][x - 1]) - 1 === curr) {
				const next = traverse(x - 1, y);

				trails += next;
			}

			return trails;
		}
	},
	10,
	1,
	false
);
