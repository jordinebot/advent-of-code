import { readFile } from 'fs/promises';

export async function readStrings(filename, split = '\n', transform = (row) => row) {
	let buffer = undefined;
	try {
		buffer = await readFile(filename);
		buffer = buffer.toString().split(split);
		buffer = buffer.map(transform)
	} catch (error) {
		console.error(error);
	}
	return buffer;
}

export async function readNumbers(filename, split = '\n') {
	const buffer = await readStrings(filename, split);
	return buffer.map((n) => parseInt(n, 10));
}

export async function readMatrix(filename, split = '\n') {
	const buffer = await readStrings(filename, split);
	return buffer.map((row) => row.split('').map((col) => Number(col)));
}
