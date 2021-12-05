import { readStrings, range } from '../common/helpers';

export const day5 = async () => {
	const data = await readStrings('src/inputs/input05');

	const lines = data.map((line) =>
		line.split(' -> ').map((point) => point.split(',').map((x) => parseInt(x, 10)))
	);

	const getLinePoints = (line, includeDiagonals = false) => {
		let points = [];
		const [[x1, y1], [x2, y2]] = line;

		if (x1 === x2) {
			points = range(Math.min(y1, y2), Math.max(y1, y2)).map((y) => [x1, y]);
		} else if (y1 === y2) {
			points = range(Math.min(x1, x2), Math.max(x1, x2)).map((x) => [x, y1]);
		} else if (includeDiagonals) {
			let X = range(Math.min(x1, x2), Math.max(x1, x2));
			let Y = range(Math.min(y1, y2), Math.max(y1, y2));

			if (x1 > x2) {
				X = X.reverse();
			}

			if (y1 > y2) {
				Y = Y.reverse();
			}

			points = X.map((x, i) => [x, Y[i]]);
		}

		return points;
	};

	const drawPoint = (point, map) => {
		const [x, y] = point;
		if (map[x] === undefined) {
			map[x] = [];
		}
		if (map[x][y] === undefined) {
			map[x][y] = 1;
		} else {
			map[x][y]++;
		}
	};

	let vents = [];
	lines.forEach((line) => {
		const linePoints = getLinePoints(line);
		linePoints.forEach((point) => drawPoint(point, vents));
	});

	let overlaps = vents.reduce(
		(overlaps, column) =>
			overlaps + column.filter((point) => point !== null && point >= 2).length,
		0
	);

	console.log('>>> Day 5');
	console.log('\tpart1:', overlaps);

	vents = [];
	lines.forEach((line) => {
		const linePoints = getLinePoints(line, true);
		linePoints.forEach((point) => drawPoint(point, vents));
	});

	overlaps = vents.reduce(
		(overlaps, column) =>
			overlaps + column.filter((point) => point !== null && point >= 2).length,
		0
	);

	console.log('\tpart2:', overlaps);
};
