import run from "../../run.js";

run(
	(input) => {
		input = input.map((line) => line.split(""));

		const width = input[0].length;
		const height = input.length;

		const obstacles = [];
		const marked = new Set();

		const guard = {
			x: null,
			y: null,
			direction: "up",
		};

		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				const char = input[y][x];

				if (char === "^") {
					guard.x = x;
					guard.y = y;
				}

				if (char === "#") obstacles.push({ x, y });
			}
		}

		while (
			guard.x >= 0 &&
			guard.x < width &&
			guard.y >= 0 &&
			guard.y < height
		) {
			marked.add(guard.x + "_" + guard.y);

			while (checkObstacle()) {
				switch (guard.direction) {
					case "up":
						guard.direction = "right";
						break;
					case "right":
						guard.direction = "down";
						break;
					case "down":
						guard.direction = "left";
						break;
					case "left":
						guard.direction = "up";
						break;
				}
			}

			switch (guard.direction) {
				case "up":
					guard.y--;
					break;
				case "right":
					guard.x++;
					break;
				case "down":
					guard.y++;
					break;
				case "left":
					guard.x--;
					break;
			}
		}

		return marked.size;

		function checkObstacle() {
			let x = guard.x,
				y = guard.y;
			switch (guard.direction) {
				case "up":
					if (y === 0) return false;
					y--;
					break;
				case "right":
					if (x === width - 1) return false;
					x++;
					break;
				case "down":
					if (y === height - 1) return false;
					y++;
					break;
				case "left":
					if (x === 0) return false;
					x--;
					break;
			}

			return obstacles.some((obstacle) => obstacle.x === x && obstacle.y === y);
		}
	},
	6,
	1,
	false
);
