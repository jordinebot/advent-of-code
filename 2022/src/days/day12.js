// --- Day 12: Hill Climbing Algorithm ---
import { findPath } from "modern-dijkstra";
import { readStrings } from "../tools/data";
import { getSquareNeighbors, createGetValue } from "../tools/matrix";

function key(x, y) {
	return `${x},${y}`;
}

export function createGraph(grid, starts = ["S"]) {
	const graph = {};
	let origins = [],
		destination;

	const heights = grid.map((row, y) =>
		row.map((col, x) => {
			if (starts.includes(col)) {
				origins.push(key(x, y));
				return 0;
			}
			if (col === "E") {
				destination = key(x, y);
				return "z".charCodeAt() - "a".charCodeAt();
			}
			return col.charCodeAt() - "a".charCodeAt();
		})
	);

	const H = createGetValue(heights);
	heights.forEach((row, y) => {
		row.forEach((h, x) => {
			const neighbors = getSquareNeighbors([x, y], heights);
			graph[key(x, y)] = {};
			neighbors.forEach((n) => {
				if (h - H(n) >= -1) {
					graph[key(x, y)][key(...n)] = 1;
				}
			});
		});
	});

	return { graph, origins, destination };
}

export function part01(input) {
	const { graph, origins, destination } = createGraph(input);
	const path = findPath(graph, origins[0], destination);
	return path.length - 1;
}

export function part02(input) {
	const { graph, origins, destination } = createGraph(input, ["S", "a"]);
	const paths = origins
		.map((origin) => {
			try {
				const path = findPath(graph, origin, destination);
				return path;
			} catch {
				return undefined;
			}
		})
		.filter((p) => p !== undefined);
	const steps = paths.map((p) => p.length - 1);
	return Math.min(...steps);
}

export async function day12() {
	const data = await readStrings("data/input12", "\n", (line) =>
		line.split("")
	);

	console.log("\nDay 12 >>>");
	console.log("\tPart 1:", part01(data));
	console.log("\tPart 2:", part02(data));
}
