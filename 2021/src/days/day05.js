import { readStrings } from '../tools/data';
import { range } from '../tools/array';

function parseLines(input) {
	return input.map((line) =>
		line.split(' -> ').map((point) => point.split(',').map((x) => parseInt(x, 10)))
	);
}

function getLinePoints(line, includeDiagonals = false) {
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
}

function drawPoint([x, y], map) {
	if (map[x] === undefined) {
		map[x] = [];
	}
	if (map[x][y] === undefined) {
		map[x][y] = 1;
	} else {
		map[x][y]++;
	}
}

function getVents(lines, includeDiagonals = false) {
	const vents = [];
	lines.forEach((line) => {
		const linePoints = getLinePoints(line, includeDiagonals);
		linePoints.forEach((point) => drawPoint(point, vents));
	});
	return vents;
}

function getOverlaps(vents) {
	return vents.reduce(
		(overlaps, column) =>
			overlaps + column.filter((point) => point !== null && point >= 2).length,
		0
	);
}

function part1(lines) {
	const vents = getVents(lines);
	return getOverlaps(vents);
}

function part2(lines) {
	const INCLUDE_DIAGONALS = true;
	const vents = getVents(lines, INCLUDE_DIAGONALS);
	return getOverlaps(vents);
}

export async function day5() {
	const data = await readStrings('data/input05');
	const lines = parseLines(data);

	console.log('\nDay 5 >>>');
	console.log('    Part 1:', part1(lines));
	console.log('    Part 2:', part2(lines));
}
