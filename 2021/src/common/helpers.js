import { readFile } from 'fs/promises';

export const readStrings = async (filename) => {
	try {
		const buffer = await readFile(filename);
		return buffer.toString().trim().split('\n');
	} catch (error) {
		console.error(error);
	}
};

export const readNumbers = async (filename) => {
	const buffer = await readStrings(filename);
	return buffer.map((n) => parseInt(n, 10));
};

export const countIncrements = (array) =>
	array.filter((item, index, items) => index > 0 && item > items[index - 1]).length;

export const sumArray = (array) => array.reduce((total, num) => total + num, 0);

export const binStr2IntArray = (binary) => binary.split('').map((b) => (b === '1' ? 1 : 0));

export const sumArrays = (array1, array2) =>
	array1.reduce((total, current, index) => {
		total[index] = current + array2[index];
		return total;
	}, Array(array1.length).fill(0));
