import run from "../../run.js";

run(
	(input) => {
		input = input.join("");

		let sum = 0;
		let enabled = true;

		const instructions = input.match(/(mul\(\d+,\d+\))|(do\(\))|(don't\(\))/g);

		for (const instruction of instructions) {
			if (instruction === "do()") {
				enabled = true;
				continue;
			}

			if (instruction === "don't()") {
				enabled = false;
				continue;
			}

			if (!enabled) continue;

			sum += instruction
				.replace("mul(", "")
				.replace(")", "")
				.split(",")
				.reduce((prev, curr) => prev * parseInt(curr), 1);
		}

		return sum;
	},
	3,
	2,
	false
);
