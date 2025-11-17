import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const USER_AGENT = "AOCHelper (github.com/diaxudev/aochelper)";
export const BASE_URL = "https://adventofcode.com";

export const DIST_DIR = resolve(fileURLToPath(import.meta.url), "../../dist");

export const ESC = "\x1B[";
export const HIDE_CURSOR = `${ESC}?25l`;
export const SHOW_CURSOR = `${ESC}?25h`;
export const CLEAR = "\x1Bc";
export const CLEAR_LINE = `${ESC}2K`;
export const CLEAR_TO_END = `${ESC}0K`;

export const SAVE_CURSOR = `${ESC}s`;
export const RESTORE_CURSOR = `${ESC}u`;

export const SCROLLABLE_REGION = (top: number, bottom: number) => `${ESC}${top};${bottom}r`;
export const CURSOR_TO = (row: number, col: number) => `${ESC}${row};${col}H`;
export const CURSOR_UP = (lines: number) => `${ESC}${lines}A`;
