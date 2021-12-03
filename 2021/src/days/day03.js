import { readStrings, binStr2IntArray, sumArrays, notBit } from '../common/helpers';

export const day3 = async () => {
	const data = await readStrings('src/inputs/input03');

	const mostCommonBit = (binaryArray, expectedWhenEqual = '1') =>
		binaryArray
			.reduce(
				(commons, current) =>
					commons.length
						? sumArrays(commons, binStr2IntArray(current))
						: binStr2IntArray(current),
				[]
			)
			.map((b) =>
				b === binaryArray.length / 2
					? expectedWhenEqual
					: b > binaryArray.length / 2
					? '1'
					: '0'
			);

	const lessCommonBit = (binaryArray, expectedWhenEqual = '1') =>
		mostCommonBit(binaryArray, notBit(expectedWhenEqual)).map(notBit);

	let gamma = '';
	let epsilon = '';

	mostCommonBit(data).forEach((x) => {
		if (x === '1') {
			gamma = gamma + '1';
			epsilon = epsilon + '0';
		} else {
			gamma = gamma + '0';
			epsilon = epsilon + '1';
		}
	});

	const power = parseInt(gamma, 2) * parseInt(epsilon, 2);
	console.log('>>> Day 3');
	console.log('\tpart1:', power);

	let [O, CO2] = [[...data], [...data]];

	for (let i = 0; i < data[0].length; i++) {
		if (O.length > 1) {
			const mostCommonO = mostCommonBit(O, '1');
			O = O.filter((o) => o[i] === mostCommonO[i]);
		}
		if (CO2.length > 1) {
			const lessCommonBitCO2 = lessCommonBit(CO2, '0');
			CO2 = CO2.filter((co2) => co2[i] === lessCommonBitCO2[i]);
		}
	}

	console.log('\tpart2:', parseInt(O[0], 2) * parseInt(CO2[0], 2));
};
