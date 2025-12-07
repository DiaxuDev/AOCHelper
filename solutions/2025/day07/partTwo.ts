import { run } from "aoc-framework";

run(
	(input) => {
		const cache = new Map<`${number}-${number}`, number>();

		function traceBeam(x: number, startY: number): number {
			let y = startY;

			while (true) {
				const id = `${x}-${y}` as const;
				if (cache.has(id)) return cache.get(id)!;

				if (y === input.length) return 0;

				if (input[y][x] === "^") {
					let result;
					if (x === 0) result = traceBeam(x + 1, y) + 1;
					if (x === input[y].length - 1) result = traceBeam(x - 1, y) + 1;
					else result = traceBeam(x - 1, y) + traceBeam(x + 1, y) + 1;

					cache.set(id, result);
					return result;
				}

				y++;
			}
		}

		return traceBeam(input[0].indexOf("S"), 1) + 1;
	},
	{ inputMode: "lines" },
);
