import { readStrings } from '../common/helpers';
import { isLower, getSquareNeighbors, getHeight, getBasin } from '../common/matrix';

export const day9 = async () => {
	const data = await readStrings('src/inputs/input09');
	const map = data.map((row) => row.split('').map((x) => parseInt(x, 10)));

	const lowPoints = [];

	map.forEach((row, x) => {
		row.forEach((height, y) => {
			const nearHeights = getSquareNeighbors([x, y], map).map((n) => getHeight(n, map));
			if (isLower(height, nearHeights)) {
				lowPoints.push([x, y]);
			}
		});
	});

	const riskLevel = lowPoints.reduce((risk, point) => risk + getHeight(point, map) + 1, 0);

	console.log('>>> Day 9');
	console.log('\tpart1:', riskLevel);

	const basins = lowPoints.map((point) => getBasin(point, map));
	const sizes = basins.map((b) => Object.keys(b).length).sort((a, b) => a - b);
	console.log(
		'\tpart2:',
		sizes.slice(-3).reduce((total, size) => (total *= size), 1)
	);
};
