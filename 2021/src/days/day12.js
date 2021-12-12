import { readStrings } from '../tools/data';

const LOWERCASE_A_ASCII = 97;

function buildMap(input) {
	const map = {};
	input.forEach((segment) => {
		const [from, to] = segment.split('-');
		if (map[from] === undefined) {
			map[from] = [to];
		} else {
			map[from].push(to);
		}
		if (to !== 'end' && from !== 'start') {
			if (map[to] === undefined) {
				map[to] = [from];
			} else {
				map[to].push(from);
			}
		}
	});
	return map;
}

function isSmallCave(cave) {
	return cave.charCodeAt(0) > LOWERCASE_A_ASCII;
}

function isFinished(path) {
	return path[path.length - 1] === 'end';
}

function explore(path, map) {
	const position = path[path.length - 1];
	const options = map[position];
	return options
		.filter((option) => !isSmallCave(option) || !path.includes(option))
		.map((option) => [...path, option]);
}

function part1(map) {
	let exploring = [['start']];
	let completed = [];
	do {
		let explored = [];
		exploring.forEach((path) => {
			explored = [...explored, ...explore(path, map)];
		});
		exploring = explored.filter((path) => !isFinished(path));
		completed = [...completed, ...explored.filter((path) => isFinished(path))];
	} while (exploring.length);
	return completed.length;
}
function part2(input) {}

export async function day12() {
	const data = await readStrings('data/input12');

	console.log('\nDay 12 >>>');
	console.log('    Part 1:', part1(buildMap(data)));
	console.log('    Part 2:', part2(data));
}
