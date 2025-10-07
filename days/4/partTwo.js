import run from "../../run.js";

run(
	(input) => {
		input = input.map((line) => line.split(""));

		let sum = 0;

		for (let i = 1; i < input.length - 1; i++) {
			const line = input[i];

			for (let j = 1; j < line.length - 1; j++) {
				const char = line[j];

				if (char !== "A") continue;

				const topLeft_bottomRight =
					input[i - 1][j - 1] + "A" + input[i + 1][j + 1];
				const topRight_bottomLeft =
					input[i - 1][j + 1] + "A" + input[i + 1][j - 1];

				if (
					(topLeft_bottomRight === "MAS" || topLeft_bottomRight === "SAM") &&
					(topRight_bottomLeft === "MAS" || topRight_bottomLeft === "SAM")
				)
					sum++;
			}
		}

		return sum;
	},
	4,
	2,
	false
);
