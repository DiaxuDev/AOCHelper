import run from "../../run.js";

run(
	(input) => {
		const antenas = {};

		for (let y = 0; y < input.length; y++) {
			for (let x = 0; x < input[0].length; x++) {
				const char = input[y][x];

				if (/^[A-z 0-9]$/.test(char)) {
					if (char in antenas) antenas[char].push({ x, y });
					else antenas[char] = [{ x, y }];
				}
			}
		}

		const antinodes = new Set();

		for (const antena in antenas) {
			const locations = antenas[antena];
			if (locations.length < 2) continue;

			const combinations = locations.flatMap((a, i) =>
				locations.slice(i + 1).map((b) => [a, b])
			);

			// Antenas itself will become antinodes
			for (const { x, y } of locations) {
				antinodes.add(x + "_" + y);
			}

			for (const [a, b] of combinations) {
				const diffX = a.x - b.x;
				const diffY = a.y - b.y;

				let i = 1;
				while (true) {
					const x = a.x + diffX * i;
					const y = a.y + diffY * i;

					if (x >= 0 && x < input[0].length && y >= 0 && y < input.length)
						antinodes.add(x + "_" + y);
					else break;

					i++;
				}

				i = 1;
				while (true) {
					const x = a.x - diffX * i;
					const y = a.y - diffY * i;

					if (x >= 0 && x < input[0].length && y >= 0 && y < input.length)
						antinodes.add(x + "_" + y);
					else break;

					i++;
				}
			}
		}

		return antinodes.size;
	},
	8,
	2,
	false
);
