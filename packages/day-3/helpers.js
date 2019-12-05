class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	toString() {
		return `${this.x},${this.y}`;
	}
	static fromString(strPoint) {
		const [x, y] = strPoint.split(",");
		return new Point(x, y);
	}
}

function manhattanDist(a, b) {
	if (!(a instanceof Point) || !(b instanceof Point)) {
		throw new Error("Manhattan Distance Error: not enought points");
	}
	return Math.abs(b.x - a.x) + Math.abs(b.y - a.y);
}

module.exports = { Point, manhattanDist };
