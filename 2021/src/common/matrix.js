export const MAX_HEIGHT = 9;
export const getSquareNeighbors = (point, matrix) => {
	const [x, y] = point;
	const neighbors = [];

	if (x > 0) neighbors.push([x - 1, y]);
	if (x < matrix.length - 1) neighbors.push([x + 1, y]);
	if (y > 0) neighbors.push([x, y - 1]);
	if (y < matrix[x].length - 1) neighbors.push([x, y + 1]);

	return neighbors;
};

export const getHeight = (point, matrix) => {
	const [x, y] = point;
	return matrix[x][y];
};

export const isLower = (point, points) => {
	return points.find((p) => p <= point) === undefined;
};

export const getBasin = (point, matrix) => {
	const [x, y] = point;
	const basin = { [`(${x}, ${y})`]: getHeight(point, matrix) };
	const explore = getSquareNeighbors(point, matrix);
	while (explore.length) {
		const p = explore.pop();
		const [x, y] = p;
		const h = getHeight(p, matrix);
		if (h < MAX_HEIGHT && basin[`(${x}, ${y})`] === undefined) {
			explore.push(p);
			getSquareNeighbors(p, matrix).map((n) => explore.push(n));
			basin[`(${x}, ${y})`] = h;
		}
	}
	return basin;
};
