import run from "../../run.js";

run(
	(input) => {
		input = input[0];

		let disk = [];

		let id = 0;
		for (const i in input) {
			const len = parseInt(input[i]);

			if (Number(i) % 2 === 0) {
				disk.push(...Array(len).fill(id));
				id++;
			} else {
				disk.push(...Array(len).fill("."));
			}
		}

		while (disk.includes(".")) {
			disk[disk.indexOf(".")] = disk.at(-1);
			disk = disk.slice(0, -1);
		}

		return disk.reduce((prev, curr, i) => prev + curr * i, 0);
	},
	9,
	1,
	false
);
