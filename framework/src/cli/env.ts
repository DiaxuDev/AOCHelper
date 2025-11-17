import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { parse } from "dotenv";

export function loadEnv(path?: string): Record<string, string> {
	if (path) {
		if (!existsSync(path)) {
			throw new Error(`.env file not found at path: ${path}`);
		}
	} else {
		for (const name of [".env", ".env.local"]) {
			const p = join(process.cwd(), name);
			if (existsSync(p)) {
				path = p;
				break;
			}
		}
	}

	const env: Record<string, string> = process.env as Record<string, string>;
	if (path) Object.assign(env, parse(readFileSync(path)));

	return env;
}
