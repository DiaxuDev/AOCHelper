import { run } from "aoc-framework";

run(
	(input) => {
		const visited = new Set<`${number}-${number}`>();

		function traceBeam(x: number, startY: number): number {
			let y = startY;

			while (true) {
				const id = `${x}-${y}` as const;
				if (visited.has(id)) return 0;
				visited.add(id);

				if (y === input.length) return 0;

				if (input[y][x] === "^") {
					if (x === 0) return traceBeam(x + 1, y) + 1;
					if (x === input[y].length - 1) return traceBeam(x - 1, y) + 1;

					return traceBeam(x - 1, y) + traceBeam(x + 1, y) + 1;
				}

				y++;
			}
		}

		return traceBeam(input[0].indexOf("S"), 1);
	},
	{ inputMode: "lines" },
);
