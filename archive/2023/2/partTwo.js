import run from "../../run.js";

run(
	input => {
		return input
			.map(line => {
				const id = parseInt(line.match(/game\s([0-9]+)/i)[1]);

				const red = line
					.match(/\d+\sred/gi)
					.map(x => parseInt(x))
					.sort((a, b) => b - a)[0];

				const green = line
					.match(/\d+\sgreen/gi)
					.map(x => parseInt(x))
					.sort((a, b) => b - a)[0];

				const blue = line
					.match(/\d+\sblue/gi)
					.map(x => parseInt(x))
					.sort((a, b) => b - a)[0];

				return red * green * blue;
			})
			.reduce((a, b) => a + b);
	},
	2,
	2
);
