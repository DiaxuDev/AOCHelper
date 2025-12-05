import { run } from "aoc-framework";

run(
	(input) => {
		const ranges = input
			.split("\n\n")[0]
			.split("\n")
			.map((line) => line.split("-").map(Number));

		const unique: number[][] = [ranges.shift()!];

		for (const line of ranges) {
			const set: number[][] = [line];

			for (const currentUnique of unique) {
				const originalSet = [...set];

				for (let i = 0; i < originalSet.length; i++) {
					const currentSet = originalSet[i];

					// currentUnique is not intersecting with currentSet
					if (currentUnique[1] < currentSet[0] || currentUnique[0] > currentSet[1]) continue;

					set.splice(i, 1);

					// currentSet is contained in currentUnique
					if (currentUnique[0] <= currentSet[0] && currentUnique[1] >= currentSet[1]) continue;

					// currentUnique starts within currentSet
					if (currentUnique[0] > currentSet[0] && currentUnique[0] <= currentSet[1])
						set.push([currentSet[0], currentUnique[0] - 1]);

					// currentUnique ends within currentSet
					if (currentUnique[1] >= currentSet[0] && currentUnique[1] <= currentSet[1])
						set.push([currentUnique[1] + 1, currentSet[1]]);
				}
			}
			unique.push(...set);
		}

		return unique.reduce((prev, curr) => prev + curr[1] - curr[0] + 1, 0);
	},
	{ inputMode: "raw" },
);
