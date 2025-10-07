import run from "../../run.js";

run(
	(input) => {
		const instructions = input
			.slice(0, input.indexOf(""))
			.map((line) => line.split("|").map(Number));
		const updates = input
			.slice(input.indexOf("") + 1)
			.map((line) => line.split(",").map(Number));

		const correct = [];

		for (const line of updates) {
			let isCorrect = true;

			for (const page of line) {
				const toCheck = instructions.filter((e) => e[0] === page);

				for (const [_, pageToCheck] of toCheck) {
					const pageIndex = line.indexOf(page);
					const pageToCheckIndex = line.indexOf(pageToCheck);
					if (pageToCheckIndex === -1) continue;

					if (pageIndex >= pageToCheckIndex) {
						isCorrect = false;
						break;
					}
				}

				if (!isCorrect) break;
			}

			if (isCorrect) correct.push(line);
		}

		return correct
			.map((line) => line[Math.floor(line.length / 2)])
			.reduce((prev, curr) => prev + curr, 0);
	},
	5,
	1,
	false
);
