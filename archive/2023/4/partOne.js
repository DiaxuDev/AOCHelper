import run from "../../run.js";

run(
	input => {
		return input
			.map(game => {
				game = game
					.replace(/Card \d+:/, "")
					.replace(/\s+/g, " ")
					.trim()
					.split(" | ");

				const winning = game[0].split(" ");
				const own = game[1].split(" ");

				const matches = own.filter(n => winning.includes(n)).length;

				if (matches === 0) return 0;
				if (matches === 1) return 1;

				return matches > 0 ? 2 ** (matches - 1) : 0;
			})
			.reduce((a, b) => a + b);
	},
	4,
	1
);
