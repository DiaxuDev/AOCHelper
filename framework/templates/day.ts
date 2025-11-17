import { run } from "aoc-framework";

run(
	(input) => {
		return input.reduce((a, b) => a + b, 0);
	},
	{ inputMode: "numberLines" },
);
