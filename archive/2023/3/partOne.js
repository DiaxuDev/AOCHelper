import run from "../../run.js";

run(
	input => {
		function isSymbol(symbol) {
			// return symbol && symbol !== "." && !/\d+/.test(symbol);
			return ["*", "/", "%", "-", "=", "@", "#", "+", "$", "&"].includes(symbol);
		}

		return input
			.map((line, row) => {
				const numbers = line.match(/\d+/g)?.map(n => {
					const i = line.indexOf(n);

					// CLeanup, indexOf breaks without this
					line = line.slice(0, i) + ".".repeat(n.length) + line.slice(i + n.length);

					const prev = line[i - 1];
					const next = line[i + n.length];

					if (isSymbol(prev) || isSymbol(next)) return parseInt(n);

					for (let j = i - 1; j <= i + n.length; j++) {
						if (row > 0) {
							const symbol = input[row - 1][j];
							if (isSymbol(symbol)) {
								return parseInt(n);
							}
						}
						if (row < input.length - 1) {
							const symbol = input[row + 1][j];
							if (isSymbol(symbol)) {
								return parseInt(n);
							}
						}
					}

					return 0;
				});

				return numbers || [];
			})
			.flat()
			.reduce((a, b) => a + b, 0);
	},
	3,
	1
);
