import { version } from "@/../package.json";
import cac from "cac";

import { Framework } from "@/framework";
import { hijackTTY } from "@/framework/logger";

import { AOCConfig } from "../../dist";
import { loadConfig } from "./config";
import { loadEnv } from "./env";

function createCLI() {
	const cli = cac("aoc");
	cli.version(version);

	cli
		.command("bootstrap <day>", "Bootstrap a new Advent of Code day")
		.action((day) => runAction((ctx) => ctx.bootstrap(parseInt(day, 10))));

	cli
		.command("download <input>", "Force redownload of the input file")
		.action((day) => runAction((ctx) => ctx.downloadInput(parseInt(day, 10))));

	cli
		.command("run <day> <part>", "Run a specific day's part")
		.option("--test", "Runs code in test mode")
		.option("--real", "Runs code in real mode")
		.action((day, part, options) => {
			let runMode: RunMode | undefined;
			if ("test" in options) runMode = "test";
			if ("real" in options) runMode = "real";

			start(day, part, false, runMode);
		});

	cli
		.command("watch <day> <part>", "Run a specific day's part in watch mode")
		.alias("w")
		.alias("dev")
		.action((day, part) => start(day, part, true));

	return cli;
}

function start(day: any, part: any, watch: boolean = false, runMode?: RunMode) {
	runAction((ctx) => {
		const dayNum = parseInt(day, 10);
		const partNum = parseInt(part, 10);

		if (partNum !== 1 && partNum !== 2) {
			ctx.logger.error("Part must be either 1 or 2");
			return;
		}

		if (runMode !== undefined) ctx.config.defaultRunMode = runMode; // TODO: Find a better way to set the run mode
		return ctx.run({ day: dayNum, part: partNum }, watch);
	});
}

async function runAction(fn: (ctx: Framework) => void | Promise<void>) {
	const env = loadEnv();
	const config = await loadConfig();

	config.token ??= env.TOKEN;

	if (!config.token) {
		throw new Error("No token provided. Please set the TOKEN environment variable or provide it in aoc.config.ts");
	}

	const ctx = new Framework({ config });
	const cleanup = hijackTTY(ctx);
	ctx.addExitHook(cleanup);

	await fn(ctx);

	if (!ctx.keepAlive) ctx.exit();
}

createCLI().parse();

type RunMode = Exclude<AOCConfig["defaultRunMode"], "auto">;
