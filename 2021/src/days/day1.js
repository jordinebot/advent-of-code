import { readFile } from 'fs';
import { countIncrements, sumArray } from '../common/helpers';

export const day1 = () =>
	readFile('src/inputs/input1', (error, buffer) => {
		if (error) {
			throw error;
		}

		const data = buffer
			.toString()
			.split('\n')
			.map((n) => parseInt(n, 10));

		const increments = countIncrements(data);
		console.log('increments:', increments);

		const WINDOW_SIZE = 3;

		const sums = data.reduce((result, current, index) => {
			if (index + WINDOW_SIZE < data.length) {
				result.push(sumArray(data.slice(index, index + WINDOW_SIZE)));
			}
			return result;
		}, []);

		const sumIncrements = countIncrements(sums);
		console.log('sumIncrements:', sumIncrements);
	});
