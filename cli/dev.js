import chalk from "chalk";
import nodemon from "nodemon";
import { existsSync } from "fs";

if (process.argv.length < 4) {
	console.log(chalk.red("Proper usage: npm run dev <day> <part>"));
	process.exit(1);
}

if (process.argv[3] !== "1" && process.argv[3] !== "2") {
	console.log(chalk.red("Part must be either 1 or 2"));
	process.exit(1);
}

if (
	!existsSync(
		`./days/${process.argv[2]}/part${process.argv[3] == 1 ? "One" : "Two"}.js`
	)
) {
	console.log(chalk.red("File does not exist"));
	process.exit(1);
}

nodemon({
	script: `./days/${process.argv[2]}/part${
		process.argv[3] == 1 ? "One" : "Two"
	}.js`,
	ext: "js, txt",
})
	.on("start", () => {
		console.log(
			chalk.gray(
				`Starting day ${process.argv[2]} part ${process.argv[3]} in dev mode...`
			)
		);
		console.log(chalk.gray("File will be restarted on changes"));
		console.log(chalk.gray("Press CTRL+C to stop"));
		console.log();
	})
	.on("restart", () => {
		console.log(chalk.gray("Restarting..."));
	})
	.on("quit", () => process.exit(0));
