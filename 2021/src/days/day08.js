import { readStrings } from '../common/helpers';

//	  aaaa
//	 b    c
//	 b    c
//	  dddd
//	 e    f
//	 e    f
//	  gggg

// Representation:

//      0 1 2 3 4 5 6
//      a b c d e f g

// 1 -> 0 0 1 0 0 1 0
// 2 -> 1 0 1 1 1 0 1
// 3 -> 1 0 1 1 0 1 1
// 4 -> 0 1 1 1 0 1 0
// 5 -> 1 1 0 1 0 1 1
// 6 -> 1 1 0 1 1 1 1
// 7 -> 1 0 1 0 0 1 0
// 8 -> 1 1 1 1 1 1 1
// 9 -> 1 1 1 1 0 1 1

// Number of segments by digit
// 0 -> 6
// 1 -> 2
// 2 -> 5
// 3 -> 5
// 4 -> 4
// 5 -> 5
// 6 -> 6
// 7 -> 3
// 8 -> 7
// 9 -> 6

export const day8 = async () => {
	// const data = await readStrings('src/inputs/input08');
	const data = await readStrings('src/inputs/sample08');
	const notes = data.map((note) => note.split(' | ').map((part) => part.split(' ')));

	const uniqueLengths = [2, 4, 3, 7];

	const uniqueQty = notes.reduce(
		(total, [_, output]) =>
			total + output.map((o) => o.length).filter((l) => uniqueLengths.includes(l)).length,
		0
	);

	console.log('>>> Day 8');
	console.log('\tpart1:', uniqueQty);
};
