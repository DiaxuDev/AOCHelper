export interface AOCConfig {
	/**
	 * Absolute path to the root directory containing all the solutions.
	 * @default process.cwd()/solutions
	 */
	root: string;
	/** The year of the Advent of Code event. If not specified defaults to current year */
	year: number;
	/**
	 * The default mode to run the solutions in when no mode is specified.
	 * - auto: Runs the solution with the test input in dev mode and with real input in single run mode.
	 * - test: Runs the solution with the test input (`input.test.txt`).
	 * - real: Runs the solution with the real input (`input.txt`).
	 * @default auto
	 */
	defaultRunMode: "auto" | "test" | "real";
	/**
	 * The session token used to authenticate requests to the Advent of Code website.
	 * If not specified, it will be read from the TOKEN environment variable.
	 */
	token?: string;
}

export interface RunOptions {
	/**
	 * The mode in which to provide the input to the solution function.
	 * - raw: The input is provided as a single raw string.
	 * - lines: The input is split into an array of strings, one for each line.
	 * - numberLines: The input is split into an array of numbers, one for each line.
	 * @default lines
	 */
	inputMode?: "raw" | "lines" | "numberLines";
}

export interface PuzzleIdentifier {
	day: number;
	part: 1 | 2;
}

export type BaseColors = "black" | "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "white";
