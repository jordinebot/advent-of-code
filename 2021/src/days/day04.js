import { readStrings, sumArray } from '../common/helpers';

const BOARD_SIZE = 5;

export const day4 = async () => {
	const data = await readStrings('src/inputs/input04');

	let drawns;
	const boards = [];

	// Prepare boards
	const board = [];
	data.forEach((row, index) => {
		if (index === 0) {
			drawns = row.split(',');
		} else {
			if (board.length < BOARD_SIZE && row !== '') {
				board.push(
					row
						.split(' ')
						.filter((x) => x !== '')
						.map((x) => ({ [x]: false }))
				);
			}
			if (board.length === BOARD_SIZE) {
				boards.push([...board]);
				board.length = 0;
			}
		}
	});

	const printBoard = (board, title = 'Board') => {
		console.log('\n', title);
		console.log('------------------------------------------------------------------');
		board.forEach((row) => console.log(JSON.stringify(row)));
		console.log('------------------------------------------------------------------');
		return true;
	};

	const markDrawn = (drawn, boards) => {
		boards.forEach((board) => {
			board.forEach((row) => {
				row.forEach((cell) => {
					if (cell[drawn] !== undefined) {
						cell[drawn] = true;
					}
				});
			});
		});
	};

	const transposeBoard = (board) => board[0].map((_, i) => board.map((row) => row[i]));

	const isWinner = (board) =>
		board.filter(
			(row) =>
				row.map((cell) => Object.values(cell)[0]).filter((marked) => !!marked).length ===
				BOARD_SIZE
		).length > 0;

	const findWinners = (boards) =>
		boards.filter((board) => isWinner(board) || isWinner(transposeBoard(board)));

	// Play
	let winners = [];
	let i = -1;
	while (!winners.length && ++i < drawns.length) {
		markDrawn(drawns[i], boards);
		winners = findWinners(boards);
	}

	const unmarkedSum = winners[0].reduce(
		(sum, row) =>
			sum +
			sumArray(
				row.map((cell) => {
					const [value, marked] = Object.entries(cell)[0];
					return !marked ? parseInt(value, 10) : 0;
				})
			),
		0
	);

	const lastDrawn = drawns[i];

	console.log('>>> Day 4');
	console.log('\tpart1:', unmarkedSum * lastDrawn);
};
