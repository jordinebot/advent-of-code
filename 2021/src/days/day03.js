import { readStrings } from '../tools/data';
import { binaryArray, not } from '../tools/binary';
import { sumArrays } from '../tools/array';

function mostCommonBit(binaryMatrix, expectedWhenEqual = '1') {
	return binaryMatrix
		.reduce(
			(commons, current) =>
				commons.length ? sumArrays(commons, binaryArray(current)) : binaryArray(current),
			[]
		)
		.map((b) =>
			b === binaryMatrix.length / 2
				? expectedWhenEqual
				: b > binaryMatrix.length / 2
				? '1'
				: '0'
		);
}

function lessCommonBit(binaryMatrix, expectedWhenEqual = '1') {
	return mostCommonBit(binaryMatrix, not(expectedWhenEqual)).map((bit) => not(bit));
}

function part1(input) {
	let gamma = '';
	let epsilon = '';

	mostCommonBit(input).forEach((bit) => {
		gamma += bit;
		epsilon += not(bit);
	});

	const power = parseInt(gamma, 2) * parseInt(epsilon, 2);
	return power;
}

function part2(input) {
	let [O, CO2] = [[...input], [...input]];

	for (let i = 0; i < input[0].length; i++) {
		if (O.length > 1) {
			const mostCommonO = mostCommonBit(O, '1');
			O = O.filter((o) => o[i] === mostCommonO[i]);
		}
		if (CO2.length > 1) {
			const lessCommonBitCO2 = lessCommonBit(CO2, '0');
			CO2 = CO2.filter((co2) => co2[i] === lessCommonBitCO2[i]);
		}
	}

	const lifeSupportRate = parseInt(O[0], 2) * parseInt(CO2[0], 2);
	return lifeSupportRate;
}

export async function day3() {
	const data = await readStrings('data/input03');

	console.log('Day 3 >>>');
	console.log('    Part 1:', part1(data));
	console.log('    Part 2:', part2(data));
}

