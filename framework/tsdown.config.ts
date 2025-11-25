import { defineConfig } from "tsdown";

export default defineConfig({
	entry: {
		index: "src/index.ts",
		worker: "src/framework/runner/worker/index.ts",
		cli: "src/cli/index.ts",
	},
	fixedExtension: false,
	copy: ["templates"],
	minify: true,
	dts: true,
});
