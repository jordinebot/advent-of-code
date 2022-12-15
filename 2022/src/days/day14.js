// --- Day 14: Regolith Reservoir ---
import { readStrings } from "../tools/data";

function point(x, y) {
	return `${x},${y}`;
}

function coords(point) {
	return point.split(",").map((n) => Number(n));
}

function isInsideBox(box, point) {
	const [x, y] = coords(point);
	const [topLeft, bottomRight] = box;

	return (
		x >= topLeft[0] &&
		x <= bottomRight[0] &&
		y >= topLeft[1] &&
		y <= bottomRight[1]
	);
}

function dropSand(sandmap, box, start) {
	let [x, y] = coords(start);
	let cx, cy;
	do {
		cx = x;
		cy = y;
		while (
			!sandmap.has(point(x, y + 1)) &&
			isInsideBox(box, point(x, y + 1))
		) {
			y++;
		}
		if (!sandmap.has(point(x - 1, y + 1))) {
			x--;
			y++;
		} else if (!sandmap.has(point(x + 1, y + 1))) {
			x++;
			y++;
		}
	} while ((x !== cx || y !== cy) && isInsideBox(box, point(x, y)));
	if (isInsideBox(box, point(x, y))) {
		sandmap.add(point(x, y));
	}
}

function dropSandFloor(sandmap, floor, start) {
	let [x, y] = coords(start);
	let cx, cy;
	do {
		cx = x;
		cy = y;
		while (!sandmap.has(point(x, y + 1)) && y + 1 < floor) {
			y++;
		}
		if (!sandmap.has(point(x - 1, y + 1)) && y + 1 < floor) {
			x--;
			y++;
		} else if (!sandmap.has(point(x + 1, y + 1)) && y + 1 < floor) {
			x++;
			y++;
		}
	} while (x !== cx || y !== cy);
	sandmap.add(point(x, y));
}

function buildSandmap(input) {
	const sandmap = new Set();
	let box = [
		// boundingBox
		[Infinity, 0], // top-left
		[-Infinity, -Infinity], // bottom-right
	];
	input.forEach((trace) => {
		const points = trace.split(" -> ");

		for (let p = 0; p < points.length - 1; p++) {
			const [x0, y0] = coords(points[p]);
			const [x1, y1] = coords(points[p + 1]);

			const topLeft = [
				Math.min(box[0][0], x0, x1),
				Math.min(box[0][1], y0, y1),
			];

			const bottomRight = [
				Math.max(box[1][0], x0, x1),
				Math.max(box[1][1], y0, y1),
			];

			box = [[...topLeft], [...bottomRight]];

			if (x0 === x1) {
				for (let d = Math.min(y0, y1); d <= Math.max(y0, y1); d++) {
					sandmap.add(point(x0, d));
				}
			} else {
				for (let d = Math.min(x0, x1); d <= Math.max(x0, x1); d++) {
					sandmap.add(point(d, y0));
				}
			}
		}
	});
	return { sandmap, box };
}

export function part01(input) {
	const { sandmap, box } = buildSandmap(input);
	let size;
	let drops = 0;
	do {
		drops++;
		size = sandmap.size;
		dropSand(sandmap, box, point(500, 0));
	} while (size !== sandmap.size);
	return drops - 1;
}

const FLOOR_OFFSET = 2;
export function part02(input) {
	const { sandmap, box } = buildSandmap(input);
	let drops = 0;
	const floor = box[1][1] + FLOOR_OFFSET;
	do {
		drops++;
		dropSandFloor(sandmap, floor, point(500, 0));
	} while (!sandmap.has(point(500, 0)));
	return drops;
}

export async function day14() {
	const data = await readStrings("data/input14");

	console.log("\nDay 14 >>>");
	console.log("\tPart 1:", part01(data));
	console.log("\tPart 2:", part02(data));
}
