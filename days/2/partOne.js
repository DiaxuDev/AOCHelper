import run from "../../run.js";

run(
	(input) => {
		let safe = 0;

		for (const line of input) {
			const values = line.split(" ");

			let isSafe = true;
			// 1 for increasing, -1 for decreasing
			let direction = 0;

			for (let i = 1; i < values.length; i++) {
				const prev = parseInt(values[i - 1]);
				const curr = parseInt(values[i]);

				if (prev < curr) {
					if (direction === 1) {
						isSafe = false;
						break;
					}

					direction = -1;
				} else if (prev > curr) {
					if (direction === -1) {
						isSafe = false;
						break;
					}

					direction = 1;
				} else {
					isSafe = false;
					break;
				}

				const diff = Math.abs(curr - prev);
				if (diff < 1 || diff > 3) {
					isSafe = false;
					break;
				}
			}

			if (isSafe) safe++;
		}

		return safe;
	},
	2,
	1,
	false
);
