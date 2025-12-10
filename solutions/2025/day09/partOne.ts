import { run } from "aoc-framework";

type Tile = [number, number];

const distance = (a: Tile, b: Tile) => Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));

run(
	(input) => {
		const red: Tile[] = input.map((line) => line.split(",").map(Number) as Tile);

		const width = Math.max(...red.map((tile) => tile[0])) + 1;
		const height = Math.max(...red.map((tile) => tile[1])) + 1;
		const midPoint: Tile = [width / 2, height / 2];

		const furthest = red
			.map((tile) => ({ tile, distance: distance(tile, midPoint) }))
			.toSorted((a, b) => b.distance - a.distance)[0].tile;
		const pair = red
			.map((tile) => ({ tile, distance: distance(tile, furthest) }))
			.toSorted((a, b) => b.distance - a.distance)[0].tile;

		return (Math.abs(furthest[0] - pair[0]) + 1) * (Math.abs(furthest[1] - pair[1]) + 1);
	},
	{ inputMode: "lines" },
);
