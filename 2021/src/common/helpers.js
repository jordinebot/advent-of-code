import { readFile } from 'fs/promises';

export const readStrings = async (filename, split = '\n') => {
	try {
		const buffer = await readFile(filename);
		return buffer.toString().trim().split(split);
	} catch (error) {
		console.error(error);
	}
};

export const readNumbers = async (filename, split) => {
	const buffer = await readStrings(filename, split);
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

export const notBit = (bit) => (bit === '1' ? '0' : '1');

export const range = (start, end) =>
	Array(end - start + 1)
		.fill()
		.map((_, i) => start + i);

export const median = (array) => array.slice().sort((a, b) => a - b)[Math.floor(array.length / 2)];

export const mean = (array) => sumArray(array) / array.length;
