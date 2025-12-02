import { run } from "aoc-framework";

run(
	(input) => {
		const ranges = input.split(",");
		let sum = 0;

		for (const range of ranges) {
			const [start, end] = range.split("-").map(Number);

			for (let i = start; i <= end; i++) {
				const str = i.toString();

				for (let j = 1; j <= str.length / 2; j++) {
					const slice = str.slice(0, j);
					const regex = new RegExp(`^(${slice}){2,}$`);

					if (regex.test(str)) {
						sum += i;
						break;
					}
				}
			}
		}

		return sum;
	},
	{ inputMode: "raw" },
);
