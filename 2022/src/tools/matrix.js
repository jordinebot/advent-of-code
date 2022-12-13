export const getNeighbors = ([x, y], matrix) => {
	const neighbors = [];
	const offsets = [-1, 0, 1];
	offsets.forEach((d) =>
		offsets.forEach((oy) => {
			if (
				(d !== 0 || oy !== 0) &&
				matrix[x + ox] !== undefined &&
				matrix[x + ox][y + oy] !== undefined
			) {
				neighbors.push([x + ox, y + oy]);
			}
		})
	);

	return neighbors;
};

export const getSquareNeighbors = ([x, y], matrix) => {
	
	const neighbors = [];
	const offsets = [-1, 1];
	offsets.forEach((d) => {
		if (matrix[y] !== undefined && matrix[y][x + d] !== undefined) {
			neighbors.push([x + d, y]);
		}
        if (matrix[y+d] !== undefined && matrix[y+d][x] !== undefined) {
			neighbors.push([x, y + d]);
		}
	});
	return neighbors;
};

export function createGetValue(matrix) {
	return ([x, y]) => matrix[y][x];
}
