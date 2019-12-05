const { Point, manhattanDist } = require("./helpers");

const directions = {
	UP: "U",
	DOWN: "D",
	LEFT: "L",
	RIGHT: "R"
};

function isStep(step) {
	return /[A-Z][0-9]+/.test(step);
}

function parseStep(step) {
	const [, direction, distance] = step.match(/([A-Z])([0-9]+)/);
	return [direction, distance];
}

function wireSection(step, origin = new Point(0, 0)) {
	let [direction, distance] = parseStep(step);
	const path = [];
	let current = origin;
	switch (direction) {
		case directions.UP:
			while (distance--) {
				current = new Point(current.x, current.y + 1);
				path.push(current);
			}
			break;
		case directions.RIGHT:
			while (distance--) {
				current = new Point(current.x + 1, current.y);
				path.push(current);
			}
			break;
		case directions.LEFT:
			while (distance--) {
				current = new Point(current.x - 1, current.y);
				path.push(current);
			}
			break;
		case directions.DOWN:
			while (distance--) {
				current = new Point(current.x, current.y - 1);
				path.push(current);
			}
			break;
	}
	return path;
}

function wireIntersections(wires = []) {
	if (wires.length < 2) return [];
	const [first, second] = wires;
	return first.filter(
		a =>
			a.toString() !== "0,0" &&
			second.some(b => b.toString() === a.toString())
	);
}

function getLowerDistance(points = [], reference = new Point(0, 0)) {
	return points
		.map(point => manhattanDist(reference, point))
		.reduce((min, current) => (min < current ? min : current));
}

function wire(steps, origin = new Point(0, 0)) {
	let path = [origin];
	steps.forEach(step => {
		if (isStep(step)) {
			path = [...path, ...wireSection(step, path[path.length - 1])];
		}
	});
	return path;
}

module.exports = { wire, wireIntersections, getLowerDistance };
