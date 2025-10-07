import run from "../../run.js";

run(
	input => {
		input = input.join("\n").split("\n\n");

		let seeds = input.shift().split(" ").slice(1).map(Number);

		for (const i in seeds) {
			if (i % 2 !== 0) {
				seeds[i] = { source: seeds[i - 1], range: seeds[i] };
				seeds[i - 1] = null;
			}
		}

		seeds = seeds.filter(Boolean);

		input = input
			.map(category =>
				category
					.split("\n")
					.slice(1)
					.map(line => {
						const [dest, source, range] = line.split(" ").map(Number);
						return { dest, source, range };
					})
			)
			.flat();

		seeds.forEach((seed, i, arr) => {
			input.forEach(({ dest, source, range }) => {
				// Check if the seed is in the range
				if (seed.source + seed.range >= source || seed.source < source + range) {
					// Check if some part of the seed is before the range
					if (seed.source < source) {
						const before = {
							source: seed.source,
							range: source - seed.source,
						};
						arr.push(before);
					}

					// Check if some part of the seed is after the range
					if (seed.source + seed.range >= source + range) {
						const after = {
							source: source + range,
							range: seed.source + seed.range - source + range,
						};
						arr.push(after);
					}

					const inRange = {
						source: null,
						range: null,
					};

					if (seed.source > source) {
						inRange.source = dest + (seed.source - source);
						inRange.range = inRange.source + (range - seed.range);
					} else {
						inRange.source = dest;
						inRange.range = Math.min(range, seed.range);
					}

					arr[i] = inRange;
				}
			});
		});

		return seeds;
	},
	5,
	1,
	true
);
