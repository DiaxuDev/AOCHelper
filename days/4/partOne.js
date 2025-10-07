import run from "../../run.js";

run(
	(input) => {
		input = input.map((line) => line.split(""));

		const WORD = "XMAS";

		let sum = 0;

		for (let i = 0; i < input.length; i++) {
			const line = input[i];

			for (let j = 0; j < line.length; j++) {
				const char = line[j];

				// Horizontal lookup
				if (j + WORD.length <= line.length) {
					if (line.slice(j, j + WORD.length).join("") === WORD) sum++;
				}

				// Reverse horizontal lookup
				if (j - WORD.length + 1 >= 0) {
					if (
						line
							.slice(j - WORD.length + 1, j + 1)
							.reverse()
							.join("") === WORD
					)
						sum++;
				}

				// Vertical lookup
				if (i + WORD.length <= input.length) {
					if (
						input
							.slice(i, i + WORD.length)
							.map((l) => l[j])
							.join("") === WORD
					)
						sum++;
				}

				// Reverse vertical lookup
				if (i - WORD.length + 1 >= 0) {
					if (
						input
							.slice(i - WORD.length + 1, i + 1)
							.map((l) => l[j])
							.reverse()
							.join("") === WORD
					)
						sum++;
				}

				// Diagonal right lookup
				if (j + WORD.length <= line.length && i + WORD.length <= input.length) {
					if (
						input
							.slice(i, i + WORD.length)
							.map((l, _i) => l[j + _i])
							.join("") === WORD
					)
						sum++;
				}

				// Diagonal left lookup
				if (j - WORD.length + 1 >= 0 && i + WORD.length <= input.length) {
					if (
						input
							.slice(i, i + WORD.length)
							.map((l, _i) => l[j - _i])
							.join("") === WORD
					)
						sum++;
				}

				// Reverse (top) diagonal right lookup
				if (j + WORD.length <= line.length && i - WORD.length + 1 >= 0) {
					if (
						input
							.slice(i - WORD.length + 1, i + 1)
							.map((l, _i) => l[j + _i])
							.reverse()
							.join("") === WORD
					)
						sum++;
				}

				// Reverse (top) diagonal left lookup
				if (j - WORD.length + 1 >= 0 && i - WORD.length + 1 >= 0) {
					if (
						input
							.slice(i - WORD.length + 1, i + 1)
							.map((l, _i) => l[j - _i])
							.reverse()
							.join("") === WORD
					)
						sum++;
				}
			}
		}

		return sum;
	},
	4,
	1,
	false
);
