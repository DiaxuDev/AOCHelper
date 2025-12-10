import { run } from "aoc-framework";

type Tile = [number, number];

enum Types {
	BORDER,
	BLOCKED,
	NONE,
}

run(
	(input) => {
		let red: Tile[] = input.map((line) => line.split(",").map(Number) as Tile);

		const xAxis = red
			.map((tile) => tile[0])
			.toSorted((a, b) => a - b)
			.filter((_, i) => i % 2 === 0);

		const yAxis = red
			.map((tile) => tile[1])
			.toSorted((a, b) => a - b)
			.filter((_, i) => i % 2 === 0);

		xAxis.unshift(0);
		yAxis.unshift(0);
		xAxis.push(xAxis[xAxis.length - 1] + 1);
		yAxis.push(yAxis[yAxis.length - 1] + 1);

		const width = xAxis.length;
		const height = yAxis.length;

		const matrix: Types[][] = Array.from({ length: yAxis.length }, () => new Array(xAxis.length).fill(Types.NONE));

		for (let i = 0; i < red.length; i++) {
			const tile = red[i];
			const next = i === red.length - 1 ? red[0] : red[i + 1];

			const x = xAxis.indexOf(tile[0]);
			const y = yAxis.indexOf(tile[1]);

			matrix[y][x] = Types.BORDER;

			if (tile[1] === next[1]) {
				const nextX = xAxis.indexOf(next[0]);

				for (let current = x; current !== nextX; current += x < nextX ? 1 : -1) {
					matrix[y][current] = Types.BORDER;
				}
			} else {
				const nextY = yAxis.indexOf(next[1]);

				for (let current = y; current !== nextY; current += y < nextY ? 1 : -1) {
					matrix[current][x] = Types.BORDER;
				}
			}
		}

		const toFill: Tile[] = [[0, 0]];

		while (toFill.length) {
			const [x, y] = toFill.pop()!;

			if (x < 0 || x > width - 1 || y < 0 || y > height - 1 || matrix[y][x] !== Types.NONE) continue;

			matrix[y][x] = Types.BLOCKED;

			toFill.push([x - 1, y]);
			toFill.push([x + 1, y]);
			toFill.push([x, y - 1]);
			toFill.push([x, y + 1]);
		}

		let best = 0;

		for (let i = 0; i < red.length; i++) {
			const tile1 = red[i];

			const x1 = xAxis.indexOf(tile1[0]);
			const y1 = yAxis.indexOf(tile1[1]);

			const slice = red.slice(0, i).concat(red.slice(i + 1));
			for (let j = 0; j < slice.length; j++) {
				const tile2 = red[j];

				const x2 = xAxis.indexOf(tile2[0]);
				const y2 = yAxis.indexOf(tile2[1]);

				const minX = x1 < x2 ? x1 : x2;
				const maxX = minX === x1 ? x2 : x1;
				const minY = y1 < y2 ? y1 : y2;
				const maxY = minY === y1 ? y2 : y1;

				const range = matrix
					.slice(minY, maxY + 1)
					.map((line) => line.slice(minX, maxX + 1))
					.flat();

				if (range.some((type) => type === Types.BLOCKED)) continue;

				const result = (Math.abs(tile1[0] - tile2[0]) + 1) * (Math.abs(tile1[1] - tile2[1]) + 1);
				if (best < result) best = result;
			}
		}

		return best;
	},
	{ inputMode: "lines" },
);
