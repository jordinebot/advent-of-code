import { readNumbers } from '../common/helpers';

const ROUNDS = 80;

export const day6 = async () => {
	const data = await readNumbers('src/inputs/input06', ',');

	let lanterfish = [...data];
	for (let i = 0; i < ROUNDS; i++) {
		let born = 0;
		lanterfish = lanterfish.map((fish) => {
			if (fish - 1 < 0) {
				born++;
				return 6;
			} else {
				return fish - 1;
			}
		});
		lanterfish = lanterfish.concat(Array(born).fill(8));
	}

	console.log('>>> Day 6');
	console.log('\tpart1:', lanterfish.length);

};
