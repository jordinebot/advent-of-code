import { readStrings } from '../common/helpers';

//	  aaaa
//	 b    c
//	 b    c
//	  dddd
//	 e    f
//	 e    f
//	  gggg

const defaultDictionary = {
	cf: 1,
	acf: 7,
	bcdf: 4,
	abdfg: 5,
	acdeg: 2,
	acdfg: 3,
	abcdfg: 9,
	abcefg: 0,
	abdefg: 6,
	abcdefg: 8
};

const sortString = (str) => str.split('').sort().join('');

const patternIncludes = (pattern, subpattern) => {
	for (let c of subpattern) {
		if (!pattern.includes(c)) {
			return false;
		}
	}
	return true;
};

const decode = (pattern, dictionary = defaultDictionary) => {
	const sorted = sortString(pattern);
	return dictionary[sorted];
};

export const day8 = async () => {
	const data = await readStrings('src/inputs/input08');
	// const data = await readStrings('src/inputs/sample08');
	const notes = data.map((note) => note.split(' | ').map((part) => part.split(' ')));

	const uniqueLengths = [2, 4, 3, 7];

	const uniqueQty = notes.reduce(
		(total, [_, output]) =>
			total + output.map((o) => o.length).filter((l) => uniqueLengths.includes(l)).length,
		0
	);

	console.log('>>> Day 8');
	console.log('\tpart1:', uniqueQty);

	const total = notes.reduce((total, [patterns, digits]) => {
		const dictionary = {};
		const memory = {};
		const orphans = [];

		patterns
			.sort((a, b) => a.length - b.length)
			.forEach((pattern) => {
				const sorted = sortString(pattern);
				switch (pattern.length) {
					case 2:
						dictionary[sorted] = 1;
						memory[1] = sorted;
						break;
					case 3:
						dictionary[sorted] = 7;
						memory[7] = sorted;
						break;
					case 4:
						dictionary[sorted] = 4;
						memory[4] = sorted;
						break;
					case 5:
						if (patternIncludes(sorted, memory[7])) {
							dictionary[sorted] = 3;
							memory[3] = sorted;
						} else {
							orphans.push(sorted);
						}
						break;
					case 6:
						if (patternIncludes(sorted, memory[3])) {
							dictionary[sorted] = 9;
							memory[9] = sorted;
						} else if (patternIncludes(sorted, memory[7])) {
							dictionary[sorted] = 0;
							memory[0] = sorted;
						} else {
							dictionary[sorted] = 6;
							memory[6] = sorted;
						}
						break;
					case 7:
						dictionary[sorted] = 8;
						memory[8] = sorted;
						break;
				}
			});

		orphans.forEach((o) => {
			if (patternIncludes(memory[6], o)) {
				dictionary[o] = 5;
				memory[5] = o;
			} else {
				dictionary[o] = 2;
				memory[2] = o;
			}
		});

		const value = parseInt(
			digits.reduce((v, d) => {
				return v + decode(d, dictionary);
			}, ''),
			10
		);
		return total + value;
	}, 0);

	console.log('\tpart2:', total);
};
