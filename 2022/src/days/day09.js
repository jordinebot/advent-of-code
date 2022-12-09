// --- Day 9: Rope Bridge ---
import { readStrings } from "../tools/data";

export function moveTail([hx, hy], [tx, ty]) {
	const [dx, dy] = [hx - tx, hy - ty];
	const dist = Math.max(Math.abs(dx), Math.abs(dy)); // https://en.wikipedia.org/wiki/Chebyshev_distance

	return dist < 2
		? [tx, ty]
		: [
				dx > 0 ? tx + 1 : dx < 0 ? tx - 1 : tx,
				dy > 0 ? ty + 1 : dy < 0 ? ty - 1 : ty,
		  ];
}

export function getTailPath(input, ropeLength) {
	const rope = Array.from(Array(ropeLength), () => [[0, 0]]);
	input.forEach((command) => {
		const [direction, steps] = command.split(" ");
		for (let step = 0; step < Number(steps); step++) {
			const head = rope[0];
			const [hx, hy] = head[0];
			switch (direction) {
				case "U":
					head.unshift([hx, hy + 1]);
					break;
				case "L":
					head.unshift([hx - 1, hy]);
					break;
				case "D":
					head.unshift([hx, hy - 1]);
					break;
				case "R":
					head.unshift([hx + 1, hy]);
					break;
			}
			for (let knot = 1; knot < rope.length; knot++) {
				rope[knot].unshift(moveTail(rope[knot - 1][0], rope[knot][0]));
			}
		}
	});
	return rope[rope.length - 1];
}

export function part01(input) {
	const tailPath = getTailPath(input, 2);
	return new Set(tailPath.map((t) => t.join(","))).size;
}

export function part02(input) {
	const tailPath = getTailPath(input, 10);
	return new Set(tailPath.map((t) => t.join(","))).size;
}

export async function day09() {
	const data = await readStrings("data/input09");

	console.log("\nDay 9 >>>");
	console.log("\tPart 1:", part01(data));
	console.log("\tPart 2:", part02(data));
}
