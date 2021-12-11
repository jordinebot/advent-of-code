import { readNumbers } from '../tools/data';
import { countIncrements, sum } from '../tools/array';

function part1(input) {
	return countIncrements(input);
}

function part2(input, size) {
	return countIncrements(
		input.reduce((result, _, index) => {
			if (index + size <= input.length) {
				result.push(sum(input.slice(index, index + size)));
			}
			return result;
		}, [])
	);
}

export async function day1() {
	const WINDOW_SIZE = 3;
	const data = await readNumbers('data/input01');

	console.log('\nDay 1 >>>');
	console.log('    Part 1:', part1(data));
	console.log('    Part 2:', part2(data, WINDOW_SIZE));
}
