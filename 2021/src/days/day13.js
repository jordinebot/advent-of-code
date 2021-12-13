import { readStrings } from '../tools/data';
import { orArrays } from '../tools/array';
import { colors } from '../tools/colors';

function parseInstructions(input) {
	const coordinates = input[0].split('\n').map((c) => c.split(','));
	const foldings = input[1]
		.split('\n')
		.map((f) => f.replace('fold along ', '').split('='))
		.map(([axis, value]) => ({ [axis]: value }));
	return [coordinates, foldings];
}

function buildPaper(coordinates) {
	const sizeX = Math.max(...coordinates.map((x) => x[0])) + 1;
	const sizeY = Math.max(...coordinates.map((y) => y[1])) + 1;

	const paper = [];
	for (let y = 0; y < sizeY; y++) {
		paper.push(Array(sizeX).fill(0));
	}
	coordinates.forEach(([x, y]) => (paper[y][x] = 1));
	return paper;
}

function countPaper(paper) {
	return paper.reduce((total, y) => total + y.filter((x) => x === 1).length, 0);
}

function foldPaper(paper, fold) {
	const [axis, value] = Object.entries(fold).pop();

	if (axis === 'y') {
		const top = paper.slice(0, value);
		const bottom = paper.slice(-value);
		return top.map((row, index) => orArrays(row, bottom[bottom.length - index - 1]));
	} else {
		const left = paper.map((y) => y.slice(0, value));
		const right = paper.map((y) => y.slice(-value));
		return left.map((row, index) => orArrays(row, right[index].reverse()));
	}
}

function printPaper(paper) {
	console.log('\n');
	paper.forEach((y) => {
		console.log(y.join('').replaceAll('0', '.').replaceAll('1', '█'));
	});
}

function readablePaper(paper) {
	return `${colors.fg.yellow}${[[], ...paper, []]
		.map((y) => y.join('').replaceAll('0', ' ').replaceAll('1', '█'))
		.join('\n\t    ')}${colors.reset}`;
}

function part1(paper, foldings) {
	const fold = foldPaper(paper, foldings[0]);
	return countPaper(fold);
}

function part2(paper, foldings) {
	let fold = paper;
	foldings.forEach((folding) => {
		fold = foldPaper(fold, folding);
	});
	return readablePaper(fold);
}

export async function day13() {
	// const data = await readStrings('data/sample13', '\n\n');
	const data = await readStrings('data/input13', '\n\n');
	const [coordinates, foldings] = parseInstructions(data);
	const paper = buildPaper(coordinates);

	console.log('\nDay 13 >>>');
	console.log('    Part 1:', part1(paper, foldings));
	console.log('    Part 2:\n', part2(paper, foldings));
}
