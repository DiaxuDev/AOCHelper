import run from "../../run.js";

run(
	input => {
		input = input.join("\n").split("\n\n");

		let seeds = input.shift().split(" ").slice(1).map(Number);

		input.forEach(category => {
			seeds = seeds.map(seed => {
				for (const value of category.split("\n").slice(1)) {
					const [dest, source, range] = value.split(" ").map(Number);
					if (seed >= source && seed < source + range) return dest + (seed - source);
				}

				return seed;
			});
		});

		return seeds.sort((a, b) => a - b)[0];
	},
	5,
	1,
	false
);
