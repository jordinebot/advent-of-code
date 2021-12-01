import { readFile } from 'fs';

readFile('./input1', (error, buffer) => {
	if (error) {
		throw error;
	}

	const data = buffer
		.toString()
		.split('\n')
		.map((n) => parseInt(n, 10));

	const increments = data.filter((item, index, items) => index > 0 && item > items[index - 1]).length
	console.log('increments:', increments);
});
