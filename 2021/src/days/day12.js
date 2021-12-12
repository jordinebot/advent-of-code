import { readStrings } from '../tools/data';

const LOWERCASE_A_ASCII = 97;

function buildMap(input) {
	const map = {};
	input.forEach((segment) => {
		const [from, to] = segment.split('-');
		if (from !== 'end' && to !== 'start') {
			if (map[from] === undefined) {
				map[from] = [to];
			} else {
				map[from].push(to);
			}
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

function isBigCave(cave) {
	return cave.charCodeAt(0) < LOWERCASE_A_ASCII;
}

function isFinished(path) {
	return path[path.length - 1] === 'end';
}

function allowOnce(option, path) {
	return !path.includes(option);
}

function allowTwice(option, path) {
	const smallCaves = path.filter((cave) => !isBigCave(cave));
	const visits = smallCaves.reduce((visits, cave) => {
		visits[cave] = visits[cave] !== undefined ? visits[cave] + 1 : 1;
		return visits;
	}, {});
	return (
		visits[option] === undefined ||
		(visits[option] === 1 && Object.values(visits).filter((visit) => visit > 1).length === 0)
	);
}

function move1(path, map) {
	const position = path[path.length - 1];
	const options = map[position];
	return options
		.filter((option) => isBigCave(option) || allowOnce(option, path))
		.map((option) => [...path, option]);
}

function move2(path, map) {
	const position = path[path.length - 1];
	const options = map[position];
	return options
		.filter((option) => option !== 'start' && isBigCave(option) || allowTwice(option, path))
		.map((option) => [...path, option]);
}

function explore(map, goExploring) {
	let exploring = [['start']];
	let completed = [];
	do {
		let explored = [];
		exploring.forEach((path) => {
			explored = [...explored, ...goExploring(path, map)];
		});
		exploring = explored.filter((path) => !isFinished(path));
		completed = [...completed, ...explored.filter((path) => isFinished(path))];
	} while (exploring.length);
	return completed.length;
}

function part1(caves) {
	return explore(caves, move1);
}

function part2(caves) {
	return explore(caves, move2);
}

export async function day12() {
	const data = await readStrings('data/input12');
	const caves = buildMap(data);

	console.log('\nDay 12 >>>');
	console.log('    Part 1:', part1(caves));
	console.log('    Part 2:', part2(caves));
}
