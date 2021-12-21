import { readStrings } from '../tools/data';

class Board {
	constructor(start) {
		this.track = Array(10)
			.fill(1)
			.map((x, i) => x + i);
		if (start !== undefined) {
			this.reset(start);
		}
	}
	get score() {
		return this._score;
	}
	set score(n) {
		this._score = n;
	}
	reset(n) {
		while (this.track[0] !== n) {
			this.shift();
		}
		this.score = 0;
	}
	move(n) {
		while (n--) {
			this.shift();
		}
		this.score = this.score + this.track[0];
	}
	shift() {
		this.track.push(this.track.shift());
	}
}

class DeterministicDice {
	constructor(sides) {
		this.sides = sides;
		this.value = 0;
		this.iterator = this.generator();
	}
	*generator() {
		while (true) {
			yield this.value++ % this.sides + 1;
		}
	}
	get rolls() {
		return this.value;
	}
	roll(times) {
		const rolls = [];
		while (times--) {
			rolls.push(this.iterator.next().value);
		}
		return rolls;
	}
}

function part1([ready1, ready2]) {
	const player1 = new Board(ready1);
	const player2 = new Board(ready2);

	const dice = new DeterministicDice(100);
	let ply = 1; // https://en.wikipedia.org/wiki/Ply_(game_theory)
	while (player1.score < 1000 && player2.score < 1000) {
		const player = ply++ % 2 ? player1 : player2;
		player.move(dice.roll(3).reduce((rolls, roll) => rolls + roll, 0));
	}
	return Math.min(player1.score, player2.score) * dice.rolls;
}
function part2([ready1, ready2]) {
	const player1 = new Board(ready1);
	const player2 = new Board(ready2);
}

export async function day21() {
	const data = await readStrings('data/input21');
	const start = data.map((player) => parseInt(player.split(': ').pop(), 10));

	console.log('\nDay 21 >>>');
	console.log('    Part 1:', part1(start));
	console.log('    Part 2:', part2(start));
}
