import { readStrings } from '../common/helpers';

export const day2 = async () => {
	const data = await readStrings('src/inputs/input2');
	const navigation = data
		.map((instruction) => instruction.split(' '))
		.map(([command, x]) => [command, parseInt(x, 10)]);

	let depth = 0;
	let hp = 0;
	let aim = 0;

	navigation.forEach(([command, x]) => {
		switch (command) {
			case 'forward':
				hp += x;
				break;
			case 'down':
				depth += x;
				break;
			case 'up':
				depth -= x;
		}
	});

	console.log('>>> Day 2');
	console.log('\tpart1:', hp * depth);

	hp = depth = 0;
	navigation.forEach(([command, x]) => {
		switch (command) {
			case 'forward':
				hp += x;
				depth += aim * x;
				break;
			case 'down':
				aim += x;
				break;
			case 'up':
				aim -= x;
		}
	});

	console.log('\tpart2:', hp * depth);
};
