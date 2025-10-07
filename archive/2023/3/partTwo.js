import run from "../../run.js";

run(
	input => {
		return input
			.map((line, row) => {
				let total = 0;
				const gears = line.matchAll(/\*/g);

				for (const gear of gears) {
					const ratios = [];

					// Check left
					if (isNumber(line[gear.index - 1])) {
						ratios.push(parseInt(consumeNumber(line, gear.index, -1)));
					}

					// Check right
					if (isNumber(line[gear.index + 1])) {
						ratios.push(parseInt(consumeNumber(line, gear.index, 1)));
					}

					// Check top
					if (row > 0) {
						let left = "";
						let right = "";

						// Check top left
						if (isNumber(input[row - 1][gear.index - 1])) {
							left = consumeNumber(input[row - 1], gear.index, -1);
						}

						// Check top right
						if (isNumber(input[row - 1][gear.index + 1])) {
							right = consumeNumber(input[row - 1], gear.index, 1);
						}

						// Check top center
						if (isNumber(input[row - 1][gear.index])) {
							// On top is only one long number
							ratios.push(parseInt(left + input[row - 1][gear.index] + right));
						} else {
							// On top can be two separate numbers
							if (left.length) ratios.push(parseInt(left));
							if (right.length) ratios.push(parseInt(right));
						}
					}

					// Check bottom
					if (row < input.length - 1) {
						let left = "";
						let right = "";

						// Check bottom left
						if (isNumber(input[row + 1][gear.index - 1])) {
							left = consumeNumber(input[row + 1], gear.index, -1);
						}

						// Check bottom right
						if (isNumber(input[row + 1][gear.index + 1])) {
							right = consumeNumber(input[row + 1], gear.index, 1);
						}

						// Check bottom center
						if (isNumber(input[row + 1][gear.index])) {
							// On top is only one long number
							ratios.push(parseInt(left + input[row + 1][gear.index] + right));
						} else {
							// On top can be two separate numbers
							if (left.length) ratios.push(parseInt(left));
							if (right.length) ratios.push(parseInt(right));
						}
					}

					// Only two ratios are allowed
					if (ratios.length === 2) total += ratios[0] * ratios[1];
				}

				return total;
			})
			.reduce((a, b) => a + b, 0);

		function isNumber(str) {
			return /\d/.test(str);
		}

		function consumeNumber(line, i, direction) {
			i = i + direction;
			let buff = "";
			while (isNumber(line[i])) {
				direction > 0 ? (buff += line[i]) : (buff = line[i] + buff);
				i += direction;
			}
			return buff;
		}
	},
	3,
	2
);
