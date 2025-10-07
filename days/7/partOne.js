import run from "../../run.js";

run(
	(input) => {
		let total = 0;

		for (const line of input) {
			let [expected, numbers] = line.split(": ");
			expected = Number(expected);
			numbers = numbers.split(" ").map(Number);

			let isValid = false;
			for (let i = 0; i < 2 ** (numbers.length - 1); i++) {
				const result = numbers.reduce((prev, curr, j) =>
					(i & (1 << (j - 1))) === 1 << (j - 1) ? prev * curr : prev + curr
				);

				if (result === expected) {
					isValid = true;
					break;
				}
			}

			if (isValid) total += expected;
		}

		return total;
	},
	7,
	1,
	false
);
