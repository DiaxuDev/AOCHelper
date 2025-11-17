export function formatTime(time: number): string {
	if (time > 1000) return `${(time / 1000).toFixed(2)}s`;
	return `${Math.round(time)}ms`;
}
