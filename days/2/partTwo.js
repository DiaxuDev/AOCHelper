import run from "../../run.js";

run(
	(input) => {
		let safe = 0;

		for (const line of input) {
			const values = line.split(" ");

			let isSafe = checkValues(values);

			if (!isSafe) {
				for (const badIndex in values) {
					const newArr = values
						.slice(0, badIndex)
						.concat(values.slice(+badIndex + 1));

					if (checkValues(newArr)) {
						isSafe = true;
						break;
					}
				}
			}

			if (isSafe) safe++;
		}

		return safe;
	},
	2,
	2,
	false
);

function checkValues(arr) {
	let isSafe = true;
	let direction = 0;

	for (let i = 1; i < arr.length; i++) {
		const prev = parseInt(arr[i - 1]);
		const curr = parseInt(arr[i]);

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

	return isSafe;
}
