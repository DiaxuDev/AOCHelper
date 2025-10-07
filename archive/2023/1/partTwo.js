import run from "../../run.js";

run(
	input => {
		return input
			.map(line => {
				let digits = "";
				let buffer = "";
				for (let i = 0; i <= line.length; i++) {
					buffer += line[i];
					if (/one|two|three|four|five|six|seven|eight|nine|zero|[0-9]/gi.test(buffer)) {
						digits += buffer
							.replaceAll("one", 1)
							.replaceAll("two", 2)
							.replaceAll("three", 3)
							.replaceAll("four", 4)
							.replaceAll("five", 5)
							.replaceAll("six", 6)
							.replaceAll("seven", 7)
							.replaceAll("eight", 8)
							.replaceAll("nine", 9)
							.replaceAll("zero", 0)
							.replace(/[^0-9]/gi, "");
						buffer = line[i];
					}
				}
				return parseInt(digits[0] + digits[digits.length - 1], 10);
			})
			.reduce((a, b) => a + b);
	},
	1,
	2
);
