import { run } from "aoc-framework";

type Point = [number, number, number];
type Pair = { a: Point; b: Point; distance: number };

const distance = (a: Point, b: Point) => Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2);

run(
	(input) => {
		const points = input.map((line) => line.split(",").map(Number) as Point);
		const pairs: Pair[] = [];

		for (let i = 0; i < points.length; i++) {
			const a = points[i];
			const slice = [...points];
			slice.splice(i);

			pairs.forEach((p) => {
				if (p.a === a) slice.splice(slice.indexOf(p.b));
				else if (p.b === a) slice.splice(slice.indexOf(p.a));
			});

			for (const b of slice) {
				const diff = distance(a, b);
				pairs.push({ a, b, distance: diff });
			}
		}

		const slice = pairs.toSorted((a, b) => a.distance - b.distance);

		let last: Pair | undefined;
		const circuits: Point[][] = [];
		while ((circuits[0]?.length ?? 0) < points.length) {
			const pair = slice.shift()!;
			last = pair;

			const possible = circuits.filter((c) => c.includes(pair.a) || c.includes(pair.b));

			if (possible.length === 0) {
				circuits.push([pair.a, pair.b]);
			} else if (possible.length === 1) {
				const circuit = possible[0];
				const includesA = circuit.includes(pair.a);
				const includesB = circuit.includes(pair.b);

				if (includesA && includesB) continue;

				if (includesA) circuit.push(pair.b);
				else if (includesB) circuit.push(pair.a);
			} else if (possible.length === 2) {
				possible[0].push(...possible[1]);
				circuits.splice(circuits.indexOf(possible[1]), 1);
			}
		}

		if (!last) throw new Error("This should not have happened");

		return last.a[0] * last.b[0];
	},
	{ inputMode: "lines" },
);
