import { run } from "aoc-framework";

run(
	(input) => {
		let sum = 0;

		let columns: number[] = [];

		for (let x = input[0].length - 1; x >= 0; x--) {
			let numbers: number[] = [];

			for (let y = 0; y < input.length; y++) {
				const char = input[y][x] ?? " "; // For some fucking reason not all rows are equal length. I totally did not spend 10 minutes debbuging this

				if (char === " ") {
					continue;
				} else if (char === "+" || char === "*") {
					columns.push(numbers.toReversed().reduce((prev, curr, i) => prev + curr * Math.pow(10, i), 0));

					if (char === "+") sum += columns.reduce((prev, curr) => prev + curr, 0);
					else sum += columns.reduce((prev, curr) => prev * curr, 1);

					columns = [];
					numbers = [];
					x--;
				} else {
					numbers.push(parseInt(char, 10));
				}
			}

			if (numbers.length) {
				columns.push(numbers.toReversed().reduce((prev, curr, i) => prev + curr * Math.pow(10, i), 0));
			}
		}

		return sum;
	},
	{ inputMode: "lines" },
);
