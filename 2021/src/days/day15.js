import { readMatrix } from '../tools/data';
import { getHeight as getRisk } from '../tools/matrix';

function id(point) {
	return point.join(',');
}

function getValidNodes([x, y], grid) {
	const valid = [];
	if (x < grid.length - 1) valid.push([x + 1, y]);
	if (y < grid[x].length - 1) valid.push([x, y + 1]);

	return valid;
}

function buildGraph(grid) {
	const graph = {};

	grid.forEach((row, x) =>
		row.forEach((_, y) => {
			graph[id([x, y])] = getValidNodes([x, y], grid).reduce(
				(edges, [x, y]) => ({ ...edges, [id([x, y])]: getRisk([x, y], grid) }),
				{}
			);
		})
	);

	return graph;
}

function findCurrent(risks, visited) {
	return Object.entries(risks)
		.filter(([node, _]) => !visited.has(node))
		.reduce(
			(current, [node, risk]) => (current === null || risk < risks[current] ? node : current),
			null
		);
}

function lowerRiskPath(graph, start, end) {
	const nodes = Object.keys(graph);

	const visited = new Set();

	const parents = nodes.reduce((parents, node) => ({ ...parents, [node]: null }), {});

	const risks = nodes.reduce(
		(risks, node) => ({ ...risks, [node]: node === start ? 0 : Infinity }),
		{}
	);

	while (visited.size !== nodes.length && !visited.has(end)) {
		const current = findCurrent(risks, visited);
		const adjacents = graph[current];
		Object.entries(adjacents)
			.sort(([_, a], [__, b]) => a - b)
			.forEach(([node, risk]) => {
				if (risks[node] === Infinity || risks[current] + risk < risks[node]) {
					risks[node] = risks[current] + risk;
					parents[node] = current;
				}
			});
		visited.add(current);
	}

	return risks[end];
}

function part1(data) {
	const graph = buildGraph(data);
	const start = id([0, 0]);
	const end = id([data.length - 1, data[0].length - 1]);
	return lowerRiskPath(graph, start, end);
}

function part2(data) {
}

export async function day15() {
	// const data = await readMatrix('data/sample15');
	const data = await readMatrix('data/input15');


	console.log('\nDay 15 >>>');
	console.log('    Part 1:', part1(data));
	console.log('    Part 2:', part2(data));
}
