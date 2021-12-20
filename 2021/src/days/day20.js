import { readStrings } from '../tools/data';

function parseImage(input) {
	const algorithm = input.shift();
	input.shift();
	return [input.map((r) => r.split('')), algorithm];
}

function expandCanvas(image, bg = '.') {
	const len = image[0].length;
	return [Array(len + 2).fill(bg), ...image.map((r) => [bg, ...r, bg]), Array(len + 2).fill(bg)];
}

function emptyCanvas(image, bg = '.') {
	const empty = [];
	image.forEach((row) => empty.push(Array(row.length).fill(bg)));
	return empty;
}

function subImage([x, y], image, bg = '.') {
	const subimage = [];
	[-1, 0, 1].forEach((oy) => {
		let row = [];
		[-1, 0, 1].forEach((ox) => {
			row.push(
				image[y + oy] && image[y + oy][x + ox] !== undefined ? image[y + oy][x + ox] : bg
			);
		});
		subimage.push(row);
	});
	return subimage;
}

function image2Binary(image) {
	return parseInt(
		image.reduce(
			(bin, row) => bin + row.join('').replaceAll('.', '0').replaceAll('#', '1'),
			''
		),
		2
	);
}

function countLit(image) {
	return image.reduce((total, row) => total + row.filter((px) => px === '#').length, 0);
}

function enhancedPixel(algorithm, index) {
	return algorithm.charAt(index);
}

function enhance(image, algorithm, bg) {
	const expanded = expandCanvas(image, bg);
	const enhanced = emptyCanvas(expanded);
	for (let y = 0; y < enhanced.length; y++) {
		for (let x = 0; x < enhanced[y].length; x++) {
			const subimage = subImage([x, y], expanded, bg);
			const index = image2Binary(subimage);
			enhanced[y][x] = enhancedPixel(algorithm, index);
		}
	}
	return enhanced;
}

function print(image) {
	console.log('\n');
	image.forEach((r) => console.log('\t', r.join('').replaceAll('.', '·').replaceAll('#', '█')));
	console.log('\n');
}

function part1(image, algorithm) {
	const flip = algorithm.charAt(0) === '#';
	const steps = 2;
	for (let i = 0; i < steps; i++) {
		const bg = flip && i % 2 !== 0 ? '#' : '.';
		image = enhance(image, algorithm, bg);
	}
	return countLit(image);
}

function part2(image, algorithm) {
	const flip = algorithm.charAt(0) === '#';
	const steps = 50;
	for (let i = 0; i < steps; i++) {
		const bg = flip && i % 2 !== 0 ? '#' : '.';
		image = enhance(image, algorithm, bg);
	}
	return countLit(image);
}

export async function day20() {
	const data = await readStrings('data/input20');
	// const data = await readStrings('data/sample20');

	const [image, algorithm] = parseImage(data);

	console.log('\nDay 20 >>>');
	console.log('    Part 1:', part1(image, algorithm));
	console.log('    Part 2:', part2(image, algorithm));
}
