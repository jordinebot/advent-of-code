// --- Day 11: Monkey in the Middle ---
import { readStrings } from "../tools/data";
import { arrayProd } from "../tools/array";

function createWorryFn(operation) {
	return (old) => {
		const [operand1, operator, operand2] = operation.split(" ");
		const op1 = operand1 === "old" ? old : Number(operand1);
		const op2 = operand2 === "old" ? old : Number(operand2);
		switch (operator) {
			case "+":
				return op1 + op2;
			case "*":
				return op1 * op2;
		}
	};
}

function createTestFn(value) {
	return (x) => x % value === 0;
}

function parseInput(input) {
	const monkeys = [];
	input.forEach((m) => {
		const parts = m.split("\n");

		const items = parts[1]
			.replace(/^[^:]+: /, "")
			.split(", ")
			.map((n) => Number(n));

		const worryFn = createWorryFn(parts[2].replace(/^[^=]+= /, ""));

		const testValue = Number(parts[3].match(/(\d+)/)[0]);

		const testFn = createTestFn(testValue);

		const throwTo = {
			true: Number(parts[4].match(/(\d+)/)[0]),
			false: Number(parts[5].match(/(\d+)/)[0]),
		};
		const inspected = 0;

		monkeys.push({
			items,
			inspected,
			worryFn,
			testValue,
			testFn,
			throwTo,
		});
	});

	return monkeys;
}

function play(monkeys, rounds, reliefFn = (x) => x) {
	for (let round = 0; round < rounds; round++) {
		monkeys.forEach((monkey) => {
			while (monkey.items.length) {
				let item = monkey.items.shift();
				item = reliefFn(monkey.worryFn(item));
				const to = monkey.throwTo[monkey.testFn(item)];
				monkeys[to].items.push(item);
				monkey.inspected++;
			}
		});
	}
	const inspected = monkeys.map((monkey) => monkey.inspected);
	inspected.sort((a, b) => b - a);
	return arrayProd(inspected.slice(0, 2));
}

export function part01(input) {
	const monkeys = parseInput(input);
	return play(monkeys, 20, (x) => Math.floor(x / 3));
}

export function part02(input) {
	const monkeys = parseInput(input);
	const lcm = monkeys.reduce((lcm, monkey) => lcm * monkey.testValue, 1); // we can multiply cause all are primes
	return play(monkeys, 10000, (x) => x % lcm);
}

export async function day11() {
	const data = await readStrings("data/input11", "\n\n");

	console.log("\nDay 11 >>>");
	console.log("\tPart 1:", part01(data));
	console.log("\tPart 2:", part02(data));
}
