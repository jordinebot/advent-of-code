import { readStrings } from '../tools/data';
import { sum } from '../tools/array';

function parseBoards(input, size) {
	let drawns = undefined;
	const board = [];
	const boards = [];
	input.forEach((row, index) => {
		if (index === 0) {
			drawns = row.split(',');
		} else {
			if (board.length < size && row !== '') {
				board.push(
					row
						.split(' ')
						.filter((x) => x !== '')
						.map((x) => ({ [x]: false }))
				);
			}
			if (board.length === size) {
				boards.push([...board]);
				board.length = 0;
			}
		}
	});

	return [drawns, boards];
}

function printBoard(board, title = 'Board') {
	console.log('\n', title);
	console.log('------------------------------------------------------------------');
	board.forEach((row) => console.log(JSON.stringify(row)));
	console.log('------------------------------------------------------------------');
}

function transposedBoard(board) {
	return board[0].map((_, i) => board.map((row) => row[i]));
}

function isWinner(board) {
	return (
		board.filter(
			(row) =>
				row.map((cell) => Object.values(cell)[0]).filter((marked) => !!marked).length ===
				row.length
		).length > 0
	);
}

function findWinners(boards) {
	return boards.filter((board) => isWinner(board) || isWinner(transposedBoard(board)));
}

function findLoser(boards) {
	return boards.find((board) => !isWinner(board) && !isWinner(transposedBoard(board)));
}

function play(drawn, boards) {
	boards.forEach((board) => {
		board.forEach((row) => {
			row.forEach((cell) => {
				if (cell[drawn] !== undefined) {
					cell[drawn] = true;
				}
			});
		});
	});
}

function sumUnmarked(board) {
	return board.reduce(
		(total, row) =>
			total +
			sum(
				row.map((cell) => {
					const [value, marked] = Object.entries(cell)[0];
					return !marked ? parseInt(value, 10) : 0;
				})
			),
		0
	);
}

function part1(drawns, boards) {
	let winners = [];
	let i = -1;

	while (!winners.length && ++i < drawns.length) {
		play(drawns[i], boards);
		winners = findWinners(boards);
	}

	const unmarkedSum = winners.length === 1 ? sumUnmarked(winners[0]) : 0;
	const lastDrawn = drawns[i];

	return unmarkedSum * lastDrawn;
}

function part2(drawns, boards) {
	let winners = [];
	let i = -1;

	while (++i < drawns.length && winners.length !== boards.length - 1) {
		play(drawns[i], boards);
		winners = findWinners(boards);
	}

	const lastDrawn = drawns[i];

	const loser = findLoser(boards);
	const unmarkedSum = sumUnmarked(loser) - lastDrawn;

	return unmarkedSum * lastDrawn;
}

export async function day4() {
	const BOARD_SIZE = 5;
	const data = await readStrings('data/input04');

	console.log('Day 4 >>>');
	console.log('    Part 1:', part1(...parseBoards(data, BOARD_SIZE)));
	console.log('    Part 2:', part2(...parseBoards(data, BOARD_SIZE)));
}
