import run from "../../run.js";

run(
	(input) => {
		let total = 0;

		for (const line of input) {
			let [expected, numbers] = line.split(": ");
			expected = Number(expected);
			numbers = numbers.split(" ").map(Number);

			let isValid = false;
			for (let i = 0; i < 3 ** (numbers.length - 1); i++) {
				const result = numbers.reduce((prev, curr, j) => {
					const controller = i.toString(3).padStart(numbers.length - 1, "0")[
						j - 1
					];

					prev = Number(prev);

					if (controller === "0") return prev + curr;
					if (controller === "1") return prev * curr;
					if (controller === "2") return prev.toString() + curr.toString();
				});

				if (Number(result) === expected) {
					isValid = true;
					break;
				}
			}

			if (isValid) total += expected;
		}

		return total;
	},
	7,
	2,
	false
);
