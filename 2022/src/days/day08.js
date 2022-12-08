import { readMatrix } from "../tools/data";
import { arraySum } from "../tools/array";

export function getVisibility(forest) {
	const size = forest.length;
	const visibilityForest = Array.from(Array(size), () =>
		new Array(size).fill(false)
	);

	let highest;
	// left to right
	for (let x = 0; x < size; x++) {
		highest = -1;
		for (let y = 0; y < size; y++) {
			if (forest[x][y] > highest) {
				visibilityForest[x][y] = visibilityForest[x][y] || true;
				highest = forest[x][y];
			}
		}
	}
	// right to left
	for (let x = 0; x < size; x++) {
		highest = -1;
		for (let y = size - 1; y >= 0; y--) {
			if (forest[x][y] > highest) {
				visibilityForest[x][y] = visibilityForest[x][y] || true;
				highest = forest[x][y];
			}
		}
	}
	// up to down
	for (let y = 0; y < size; y++) {
		highest = -1;
		for (let x = 0; x < size; x++) {
			if (forest[x][y] > highest) {
				visibilityForest[x][y] = visibilityForest[x][y] || true;
				highest = forest[x][y];
			}
		}
	}
	// down to up
	for (let y = 0; y < size; y++) {
		highest = -1;
		for (let x = size - 1; x >= 0; x--) {
			if (forest[x][y] > highest) {
				visibilityForest[x][y] = visibilityForest[x][y] || true;
				highest = forest[x][y];
			}
		}
	}
	return visibilityForest;
}

export function getScenicScore(forest, [tx, ty]) {
	const size = forest.length;
	const tree = forest[tx][ty];

	// to up
	let up = 0;
	for (let x = tx - 1; x >= 0; x--) {
		up++;
		if (forest[x][ty] >= tree) break;
	}

	// to down
	let down = 0;
	for (let x = tx + 1; x < size; x++) {
		down++;
		if (forest[x][ty] >= tree) break;
	}

	// to right
	let right = 0;
	for (let y = ty + 1; y < size; y++) {
		right++;	
		if (forest[tx][y] >= tree) break;
	}

	// to left
	let left = 0;
	for (let y = ty - 1; y >= 0; y--) {
		left++;
		if (forest[tx][y] >= tree) break;
	}
	return up * down * right * left;
}

export function part01(input) {
	return getVisibility(input).reduce(
		(total, row) => total + arraySum(row),
		0
	);
}

export function part02(input) {
	let highestScenicScore = 0;
	for (let x = 0; x < input.length; x++) {
		for (let y = 0; y < input.length; y++) {
			highestScenicScore = Math.max(
				highestScenicScore,
				getScenicScore(input, [x, y])
			);

		}
	}
	return highestScenicScore;
}

export async function day08() {
	const data = await readMatrix("data/input08");

	console.log("\nDay 8 >>>");
	console.log("\tPart 1:", part01(data));
	console.log("\tPart 2:", part02(data));
}
