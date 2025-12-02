import { run } from "aoc-framework";

run(
	(input) => {
		const ranges = input.split(",");
		let sum = 0;

		for (const range of ranges) {
			const [start, end] = range.split("-").map(Number);

			for (let i = start; i <= end; i++) {
				const str = i.toString();
				if (str.length % 2 !== 0) continue;

				if (str.slice(0, str.length / 2) === str.slice(str.length / 2)) sum += i;
			}
		}

		return sum;
	},
	{ inputMode: "raw" },
);
