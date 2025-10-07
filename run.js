import chalk from "chalk";
import { readFileSync } from "fs";

/*
 * @param {Function} runner
 * @param {Number} day
 * @param {Number} part
 * @param {Boolean} [test=false]
 * @returns {void}
 */
export default async function (runner, day, part, test = false) {
	const start = performance.now();
	const output = await runner(
		readFileSync(
			`./days/${day}/input${test ? ".test" : ""}.txt`,
			"utf-8"
		).split("\n")
	);

	Object.prototype.toString = function () {
		return JSON.stringify(this, "", 2);
	};

	console.log(
		chalk.green("Day ") +
			chalk.blue(day) +
			chalk.green(", part ") +
			chalk.blue(part) +
			chalk.green(" result: ") +
			chalk.gray(output)
	);
	console.log(
		chalk.gray("Time elapsed: ") + chalk.blue(performance.now() - start + "ms")
	);
}
