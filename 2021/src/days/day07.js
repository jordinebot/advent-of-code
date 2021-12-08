import { readNumbers, median, mean, range } from '../common/helpers';

export const day7 = async () => {
	// const data = await readNumbers('src/inputs/sample07', ',');
	const data = await readNumbers('src/inputs/input07', ',');

	const m = median(data);
	const a = Math.ceil(mean(data));

	let fuel = {};
	const position = median(data);
	fuel[position] = 0;
	data.forEach((crab) => (fuel[position] += Math.abs(crab - position)));

	console.log('>>> Day 7');
	console.log('\tpart1:', fuel[position]);

	fuel = {};
	let lowest = Infinity;
	const explore = range(Math.min(a, m), Math.max(a, m));
	explore.forEach((position) => {
		fuel[position] = 0;
		data.forEach((crab) => {
			const jumps = Math.abs(crab - position);
			fuel[position] += (jumps * (jumps + 1)) / 2;
		});
		lowest = fuel[position] < lowest ? fuel[position] : lowest;
	});
	console.log('\tpart2:', lowest);
};
