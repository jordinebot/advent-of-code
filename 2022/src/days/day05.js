import { readStrings } from "../tools/data";

const CRATE_WIDTH = 4;

const CRATE = /(\[\w\]\s?)+/g;
const NON_CRATE = /[^A-Z]/g;
const MOVE = /^move (\d+) from (\d) to (\d)/g;

export function parseData(data) {
	const stacks = [];
	const moves = [];

	data.forEach((row) => {
		if (/^move/.test(row)) {
			const matches = [...row.matchAll(MOVE)];
			moves.push(
				matches[0]
					.slice(1, 4)
					.map((n) => Number(n))
					.map((n, i) => (i === 0 ? n : n - 1))
			);
		} else {
			const matches = [...row.matchAll(CRATE)];
			matches.forEach((m) => {
				const crates = m[0].replaceAll(NON_CRATE, "").split("");
				crates.forEach((crate, i) => {
					const index = i + m.index / CRATE_WIDTH;
					if (!stacks[index]) {
						stacks[index] = [];
					}
					stacks[index].unshift(crate);
				});
			});
		}
	});
	return { stacks, moves };
}

export function part01({ stacks, moves }) {
	moves.forEach(([n, origin, destination]) => {
		while (n--) {
			const crate = stacks[origin].pop();
			stacks[destination].push(crate);
		}
	});
	return stacks.map((s) => s.pop()).join("");
}

export function part02({ stacks, moves }) {
	moves.forEach(([n, origin, destination]) => {
		stacks[destination] = stacks[destination].concat(
			stacks[origin].splice(-n, n)
		);
	});
	return stacks.map((s) => s.pop()).join("");
}

export async function day05() {
	const data = await readStrings("data/input05");
	const parsed = parseData(data);

	console.log("\nDay 5 >>>");
	console.log("\tPart 1:", part01(structuredClone(parsed)));
	console.log("\tPart 2:", part02(structuredClone(parsed)));
}
