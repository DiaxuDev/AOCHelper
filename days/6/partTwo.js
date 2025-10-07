import run from "../../run.js";

let simulation = 0;

run(
	(input) => {
		input = input.map((line) => line.split(""));

		const width = input[0].length;
		const height = input.length;

		const obstacles = [];

		let possibilities = 0;

		const startingPoint = {
			x: null,
			y: null,
			direction: "up",
		};

		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				const char = input[y][x];

				if (char === "^") {
					startingPoint.x = x;
					startingPoint.y = y;
				}

				if (char === "#") obstacles.push({ x, y });
			}
		}

		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				if (
					(startingPoint.x === x && startingPoint.y === y) ||
					obstacles.some((obstacle) => obstacle.x === x && obstacle.y === y)
				)
					continue;

				if (
					simulateGuard(width, height, startingPoint, [{ x, y }, ...obstacles])
				) {
					possibilities++;
					input[y][x] = "O";
				}
			}
		}

		return possibilities;
	},
	6,
	2,
	false
);

function simulateGuard(width, height, startingPoint, obstacles) {
	console.log("Simulation %d started", ++simulation);

	const guard = {
		x: startingPoint.x,
		y: startingPoint.y,
		direction: startingPoint.direction,
	};

	const visited = [];

	while (guard.x >= 0 && guard.x < width && guard.y >= 0 && guard.y < height) {
		while (checkObstacle(width, height, guard, obstacles)) {
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

		if (
			visited.some(
				(box) =>
					box.x === guard.x &&
					box.y === guard.y &&
					box.direction === guard.direction
			)
		)
			return true;
		visited.push({ x: guard.x, y: guard.y, direction: guard.direction });

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

	return false;
}

function checkObstacle(width, height, guard, obstacles) {
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
