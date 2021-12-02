import { readStrings } from '../common/helpers';

export const day2 = async () => {
	const data = await readStrings('src/inputs/input2');
	const navigation = data
		.map((instruction) => instruction.split(' '))
		.map(([direction, amount]) => [direction, parseInt(amount, 10)]);

	let depth = 0;
	let hp = 0;

	navigation.forEach(([direction, amount]) => {
		switch (direction) {
			case 'forward':
				hp += amount;
				break;
			case 'down':
				depth += amount;
				break;
			case 'up':
				depth -= amount;
		}
	});

	console.log('hp:', hp);
	console.log('depth:', depth);
	console.log('result', hp * depth);
};
