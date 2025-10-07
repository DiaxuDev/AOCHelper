import run from "../../run.js";

run(
	(input) => {
		let score = 0;

		for (let y = 0; y < input.length; y++) {
			for (let x = 0; x < input[0].length; x++) {
				if (input[y][x] === "0") {
					const trailfeet = traverse(x, y);

					score += new Set(
						trailfeet.filter((foot) => foot.split("_")[0] === "9")
					).size;
				}
			}
		}

		return score;

		function traverse(x, y) {
			const curr = parseInt(input[y][x]);
			const result = [];

			let pathFound = false;

			// Check top
			if (y > 0 && Number(input[y - 1][x]) - 1 === curr) {
				result.push(traverse(x, y - 1));
				pathFound = true;
			}
			// Check right
			if (x < input[0].length - 1 && Number(input[y][x + 1]) - 1 === curr) {
				result.push(traverse(x + 1, y));
				pathFound = true;
			}
			// Check bottom
			if (y < input.length - 1 && Number(input[y + 1][x]) - 1 === curr) {
				result.push(traverse(x, y + 1));
				pathFound = true;
			}
			// Check left
			if (x > 0 && Number(input[y][x - 1]) - 1 === curr) {
				result.push(traverse(x - 1, y));
				pathFound = true;
			}

			// String instead of object, because Set doesn't recognize two identical objects as the same (some js stack vs heap memory issues)
			if (!pathFound) return curr + "_" + x + "_" + y;

			return result.flat();
		}
	},
	10,
	1,
	false
);
