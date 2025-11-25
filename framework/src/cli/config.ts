import { existsSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { type AOCConfig } from "@/types";
import { createJiti } from "jiti";

const defaultConfig: AOCConfig = {
	root: join(process.cwd(), "solutions"),
	year: new Date().getFullYear(),
	defaultRunMode: "test",
};

const configFileName = "aoc.config.ts";

export async function loadConfig(): Promise<AOCConfig> {
	let config = defaultConfig;

	if (existsSync(join(process.cwd(), configFileName))) {
		const jiti = createJiti(pathToFileURL(process.cwd()).href);
		const userConfig = (await jiti.import(`./${configFileName}`)) as {
			default: Partial<AOCConfig>;
		};
		Object.assign(config, userConfig.default);
	}

	return config;
}

export const defineConfig = (config: Partial<AOCConfig>) => config;
