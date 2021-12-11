import { readStrings } from '../tools/data';

function parseNavigation(input) {
	return input
		.map((instruction) => instruction.split(' '))
		.map(([command, x]) => [command, parseInt(x, 10)]);
}

export function part1(input) {
	let depth = 0;
	let position = 0;

	input.forEach(([command, x]) => {
		switch (command) {
			case 'forward':
				position += x;
				break;
			case 'down':
				depth += x;
				break;
			case 'up':
				depth -= x;
		}
	});

	return position * depth;
}

export function part2(input) {
	let aim = 0;
	let depth = 0;
	let position = 0;

	input.forEach(([command, x]) => {
		switch (command) {
			case 'forward':
				position += x;
				depth += aim * x;
				break;
			case 'down':
				aim += x;
				break;
			case 'up':
				aim -= x;
		}
	});

	return position * depth;
}

export async function day2() {
	const data = await readStrings('data/input02');
	const navigation = parseNavigation(data);

	console.log('\nDay 2 >>>');
	console.log('    Part 1:', part1(navigation));
	console.log('    Part 2:', part2(navigation));
}
