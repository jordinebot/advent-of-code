import { readStrings } from "../tools/data";

export function moveTail([hx, hy], [tx, ty]) {
	const dist = [hx - tx, hy - ty].join(",");
	switch (dist) {
		case "2,0":
			return [tx + 1, ty];
		case "2,1":
		case "1,2":
			return [tx + 1, ty + 1];
		case "0,2":
			return [tx, ty + 1];
		case "-1,2":
		case "-2,1":
			return [tx - 1, ty + 1];
		case "-2,0":
			return [tx - 1, ty];
		case "-2,-1":
		case "-1,-2":
			return [tx - 1, ty - 1];
		case "0,-2":
			return [tx, ty - 1];
		case "1,-2":
		case "2,-1":
			return [tx + 1, ty - 1];
		default:
			return [tx, ty];
	}
}

export function getTailPath(input) {
	const head = [[0, 0]];
	const tail = [[0, 0]];
	input.forEach((command) => {
		const [direction, steps] = command.split(" ");
		for (let step = 0; step < steps; step++) {
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
			tail.unshift(moveTail(head[0], tail[0]));
		}
	});
	return tail;
}

export function part01(input) {
	
	const tailPath = getTailPath(input);
	return new Set(tailPath.map((t) => t.join(","))).size;
}

export function part02(input) {
	const tailPath = getTailPath(input);
	return new Set(tailPath.map((t) => t.join(","))).size;
}

export async function day09() {
	const data = await readStrings("data/input09");

	console.log("\nDay 9 >>>");
	console.log("\tPart 1:", part01(data));
	console.log("\tPart 2:", part02(data));
}
