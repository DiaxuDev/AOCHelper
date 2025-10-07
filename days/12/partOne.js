import run from "../../run.js";

run(
	(input) => {
		const traversed = new Set();

		const traverse = (x, y) => {
			traversed.add(x + "_" + y);

			const symbol = input[y][x];
			let tile = {};

			let area = 1;
			let fences = 0;

			// Check top
			tile = { x, y: y - 1 };
			if (tile.y >= 0 && input[tile.y][tile.x] === symbol) {
				if (!traversed.has(tile.x + "_" + tile.y)) {
					const result = traverse(tile.x, tile.y);

					area += result[0];
					fences += result[1];
				}
			} else fences++;

			// Check right
			tile = { x: x + 1, y };
			if (tile.x < input[0].length && input[tile.y][tile.x] === symbol) {
				if (!traversed.has(tile.x + "_" + tile.y)) {
					const result = traverse(tile.x, tile.y);

					area += result[0];
					fences += result[1];
				}
			} else fences++;

			// Check bottom
			tile = { x, y: y + 1 };
			if (tile.y < input.length && input[tile.y][tile.x] === symbol) {
				if (!traversed.has(tile.x + "_" + tile.y)) {
					const result = traverse(tile.x, tile.y);

					area += result[0];
					fences += result[1];
				}
			} else fences++;

			// Check left
			tile = { x: x - 1, y };
			if (tile.x >= 0 && input[tile.y][tile.x] === symbol) {
				if (!traversed.has(tile.x + "_" + tile.y)) {
					const result = traverse(tile.x, tile.y);

					area += result[0];
					fences += result[1];
				}
			} else fences++;

			return [area, fences];
		};

		let sum = 0;

		for (let y = 0; y < input.length; y++) {
			for (let x = 0; x < input[0].length; x++) {
				if (traversed.has(x + "_" + y)) continue;
				const result = traverse(x, y);

				sum += result[0] * result[1];
			}
		}

		return sum;
	},
	12,
	1,
	false
);
