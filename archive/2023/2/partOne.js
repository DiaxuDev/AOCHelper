import run from "../../run.js";

run(
	input => {
		return input
			.map(line => {
				const id = parseInt(line.match(/game\s([0-9]+)/i)[1]);

				const red = line
					.match(/\d+\sred/gi)
					.map(x => parseInt(x))
					.filter(x => x > 12);

				const green = line
					.match(/\d+\sgreen/gi)
					.map(x => parseInt(x))
					.filter(x => x > 13);

				const blue = line
					.match(/\d+\sblue/gi)
					.map(x => parseInt(x))
					.filter(x => x > 14);

				return red.length || green.length || blue.length ? 0 : id;
			})
			.reduce((a, b) => a + b);
	},
	2,
	1
);
