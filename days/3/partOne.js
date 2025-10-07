import run from "../../run.js";

run(
	(input) => {
		input = input.join("");

		return input
			.match(/mul\(\d+,\d+\)/g)
			.map((mul) =>
				mul
					.replace("mul(", "")
					.replace(")", "")
					.split(",")
					.reduce((prev, curr) => prev * parseInt(curr), 1)
			)
			.reduce((prev, curr) => prev + curr, 0);
	},
	3,
	1,
	false
);
