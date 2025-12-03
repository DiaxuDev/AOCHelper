import { run } from "aoc-framework";

run(
	(input) => {
		let sum = 0;

		for (const line of input) {
			const numbers = line
				.split("")
				.map((val, i) => ({ i, val: parseInt(val, 10) }))
				.sort((a, b) => b.val - a.val);

			const firstDigit = numbers[0].i + 1 === line.length ? numbers[1] : numbers[0];
			const secondDigit = numbers.find((digit) => digit.i > firstDigit.i);

			sum += +`${firstDigit.val}${secondDigit?.val}`;
		}

		return sum;
	},
	{ inputMode: "lines" },
);
