import { run } from "aoc-framework";

run(
	(input) => {
		let sum = 0;

		for (const line of input) {
			const numbers: Digit[] = line
				.split("")
				.map((val, i) => ({ i, val: parseInt(val, 10) }))
				.sort((a, b) => b.val - a.val);

			const digits: Digit[] = [];
			for (let i = 0; i < 12; i++) {
				const digit = numbers.find((d) => {
					if (d.i > line.length - (12 - i)) return false;
					if (i > 0 && d.i <= digits[i - 1].i) return false;
					return true;
				});

				if (digit === undefined) throw new Error("This should have never happened");

				digits.push(digit);
			}

			sum += parseInt(digits.map((d) => d.val).join(""), 10);
		}

		return sum;
	},
	{ inputMode: "lines" },
);

type Digit = { i: number; val: number };
