import { readStrings, binStr2IntArray, sumArrays } from '../common/helpers';

export const day3 = async () => {
	const data = await readStrings('src/inputs/input03');

	let sum = binStr2IntArray(data[0]);

	data.forEach((binary, index) => {
		if (index) {
			sum = sumArrays(sum, binStr2IntArray(binary));
		}
	});

	let gamma = '';
	let epsilon = '';

	sum.forEach((x) => {
		if (x > data.length / 2) {
			gamma = gamma + '1';
			epsilon = epsilon + '0';
		} else {
			gamma = gamma + '0';
			epsilon = epsilon + '1';
		}
	});

	const power = parseInt(gamma, 2) * parseInt(epsilon, 2);
	console.log('>>> Day 3');
	console.log('\tpart1:', power);
};
