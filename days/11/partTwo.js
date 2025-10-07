import run from "../../run.js";

run(
	async (input) => {
		input = input[0].split(" ").map(Number);

		const cache = new Map();

		const blink = (val, blinks) => {
			if (cache.has(val + "_" + blinks)) return cache.get(val + "_" + blinks);

			let result = 0;

			if (blinks === 0) result = 1;
			else if (val === 0) result = blink(1, blinks - 1);
			else if (val.toString().length % 2 === 0) {
				const stringified = val.toString();
				const first = parseInt(
					stringified.substring(0, stringified.length / 2)
				);
				const second = parseInt(stringified.substring(stringified.length / 2));

				result = blink(first, blinks - 1) + blink(second, blinks - 1);
			} else result = blink(val * 2024, blinks - 1);

			cache.set(val + "_" + blinks, result);
			return result;
		};

		return input.reduce((prev, curr) => prev + blink(curr, 75), 0);
	},
	11,
	2,
	false
);
