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

			const combinations = locations.flatMap((a, i) =>
				locations.slice(i + 1).map((b) => [a, b])
			);

			for (const [a, b] of combinations) {
				const diffX = a.x - b.x;
				const diffY = a.y - b.y;

				const antinode1 = {
					x: a.x + diffX,
					y: a.y + diffY,
				};

				const antinode2 = {
					x: b.x - diffX,
					y: b.y - diffY,
				};

				if (
					antinode1.x >= 0 &&
					antinode1.x < input[0].length &&
					antinode1.y >= 0 &&
					antinode1.y < input.length
				)
					antinodes.add(antinode1.x + "_" + antinode1.y);

				if (
					antinode2.x >= 0 &&
					antinode2.x < input[0].length &&
					antinode2.y >= 0 &&
					antinode2.y < input.length
				)
					antinodes.add(antinode2.x + "_" + antinode2.y);
			}
		}

		return antinodes.size;
	},
	8,
	1,
	false
);
