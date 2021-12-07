import { readNumbers, median, average, range } from '../common/helpers';

export const day7 = async () => {
	// const data = await readNumbers('src/inputs/sample07', ',');
	const data = await readNumbers('src/inputs/input07', ',')

	const m = median(data);
	const a = Math.ceil(average(data));
	const explore = range(Math.min(a, m), Math.max(a, m));

	const fuel = {};
	let lowest = Infinity;
	explore.forEach((position) => {
		fuel[position] = 0;
		data.forEach((crab) => (fuel[position] += Math.abs(crab - position)));
		lowest = fuel[position] < lowest ? fuel[position] : lowest;
	});

	console.log('>>> Day 7');
	console.log('\tpart1:', lowest);
};
