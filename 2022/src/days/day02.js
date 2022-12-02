import { readStrings } from "../tools/data";

const WIN_SCORE = 6;
const DRAW_SCORE = 3;

const wins = ["A Y", "B Z", "C X"];
const draws = ["A X", "B Y", "C Z"];

const value = { // part 1
    X: 1, Y: 2, Z: 3,
};

const hint = { // part 2
	X: 0, Y: DRAW_SCORE, Z: WIN_SCORE,
};

const requiredPlay = {
	Z: { // to win
	    A: "Y", B: "Z", C: "X",
	},
	Y: { // to draw
		A: "X", B: "Y", C: "Z",
	},
	X: { // to lose
		A: "Z", B: "X", C: "Y",
	},
};

export function part01(input) {
	return input.reduce(
		(score, move) =>
			score +
			value[move[2]] +
			WIN_SCORE * (wins.includes(move) & 1) + // `& 1` converts `true` into 1 and `false` into 0
			DRAW_SCORE * (draws.includes(move) & 1),
		0
	);
}

export function part02(input) {
	return input
		.map((i) => i.split(" "))
		.reduce(
			(score, [opponentsMove, expectedResult]) =>
				score +
				hint[expectedResult] +
				value[requiredPlay[expectedResult][opponentsMove]],
			0
		);
}

export async function day02() {
	const data = await readStrings("data/input02");

	console.log("\nDay 2 >>>");
	console.log("\tPart 1:", part01(data));
	console.log("\tPart 2:", part02(data));
}
