import run from "../../run.js";

run(
	input => {
		const cards = input.map(game => {
			game = game.replace(/\s+/g, " ").trim();

			game = game
				.replace(/Card \d+:/, "")
				.trim()
				.split(" | ");

			const winning = game[0].split(" ");
			const own = game[1].split(" ");

			const matches = own.filter(n => winning.includes(n)).length;

			return { matches, count: 1 };
		});

		cards.forEach((card, i) => {
			for (let j = i + 1; j <= i + card.matches; j++) {
				if (j >= cards.length) break;
				cards[j].count += card.count;
			}
		});

		return cards.reduce((acc, card) => acc + card.count, 0);
	},
	4,
	2,
	false
);
