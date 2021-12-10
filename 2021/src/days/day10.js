import { readStrings } from '../common/helpers';

export const day10 = async () => {
	const data = await readStrings('src/inputs/input10');

	const pairs = {
		')': '(',
		']': '[',
		'}': '{',
		'>': '<'
	};

	let points = {
		')': 3,
		']': 57,
		'}': 1197,
		'>': 25137
	};

	const isOpening = (c) => Object.values(pairs).includes(c);
	const isClosing = (c) => Object.keys(pairs).includes(c);
	const match = (o, c) => pairs[c] === o;

	let index;
	let score = 0;
	let stack = [];
	let corrupt = false;
	const incompletes = [];
	for (let line of data) {
		stack = [];
		corrupt = false;
		for (index in line) {
			const c = line[index];
			if (isOpening(c)) {
				stack.push(c);
			}
			if (isClosing(c)) {
				const o = stack.pop();
				if (!match(o, c)) {
					score += points[c];
					corrupt = true;
					break;
				}
			}
		}
		if (!corrupt && stack.length !== 0) {
			incompletes.push(stack);
		}
	}
	console.log('>>> Day 10');
	console.log('\tpart1:', score);

	points = {
		')': 1,
		']': 2,
		'}': 3,
		'>': 4
	};

	const close = {
		'(': ')',
		'[': ']',
		'{': '}',
		'<': '>'
	};

	score = incompletes
		.map((stack) => {
			let score = 0;
			while (stack.length) {
				const o = stack.pop();
				score = score * 5 + points[close[o]];
			}
			return score;
		})
		.sort((a, b) => a - b)[Math.floor(incompletes.length / 2)];

	console.log('\tpart2:', score);
};
