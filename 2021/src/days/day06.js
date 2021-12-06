import { readNumbers } from '../common/helpers';

export const day6 = async () => {
	const data = await readNumbers('src/inputs/input06', ',');

	let ROUNDS = 80;
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

	let school = {};
	data.forEach((fish) => (school[fish] = school[fish] !== undefined ? school[fish] + 1 : 1));

	const generation = (currentGeneration) => {
		const nextGeneration = {};
		Object.entries(currentGeneration).forEach(([cicle, quantity]) => {
			if (cicle == 0) {
				nextGeneration['8'] = quantity;
				nextGeneration['6'] =  quantity;
			} else {
				nextGeneration[`${cicle - 1}`] = (nextGeneration[`${cicle - 1}`] || 0) + quantity;
			}
		});
		return nextGeneration;
	};

	ROUNDS = 256;
	for (let i = 0; i < ROUNDS; i++) {
		school = generation(school);
	}

	lanterfish = Object.values(school).reduce((total, quantity) => total + quantity, 0);
	console.log('\tpart2:', lanterfish);
};
