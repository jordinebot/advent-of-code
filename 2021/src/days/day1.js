import { readNumbers, countIncrements, sumArray } from '../common/helpers';

const WINDOW_SIZE = 3;

export const day1 = async () => {
	const data = await readNumbers('src/inputs/input1');

	const increments = countIncrements(data);
	console.log('>>> Day 1')
	console.log('\tpart1:', increments);

	const sums = data.reduce((result, _, index) => {
		if (index + WINDOW_SIZE < data.length) {
			result.push(sumArray(data.slice(index, index + WINDOW_SIZE)));
		}
		return result;
	}, []);

	const sumIncrements = countIncrements(sums);
	console.log('\tpart2:', sumIncrements);
};
