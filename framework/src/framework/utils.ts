export function formatTime(time: number): string {
	if (time > 1000) return `${(time / 1000).toFixed(2)}s`;
	return `${Math.round(time)}ms`;
}

export function assert(condition: any, source: string): asserts condition {
	if (!condition) {
		throw new Error(`Assertion from source ${source} failed. Was the environment set up correctly?`);
	}
}
