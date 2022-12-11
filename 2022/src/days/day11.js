// --- Day 11: Monkey in the Middle ---
import { readStrings } from "../tools/data";

function parseOperation(operation) {
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

function parseTest(value) {
	return (x) => x % value === 0;
}

function parseInput(input) {
	const monkeys = [];
	input.forEach((m) => {
		const monkey = {};
		const parts = m.split("\n");
		monkey.items = parts[1]
			.replace(/^[^:]+: /, "")
			.split(", ")
			.map((n) => Number(n));
		monkey.worryFn = parseOperation(parts[2].replace(/^[^=]+= /, ""));
		monkey.testValue = Number(parts[3].match(/(\d+)/)[0])
		monkey.testFn = parseTest(monkey.testValue);
		monkey.throwTo = {
			true: Number(parts[4].match(/(\d+)/)[0]),
			false: Number(parts[5].match(/(\d+)/)[0]),
		};
		monkey.inspected = 0;
		monkeys.push(monkey);
	});
	return monkeys;
}

function play(monkeys, rounds, reliefFn) {
	for (let round = 0; round < rounds; round++) {
		monkeys.forEach((monkey) => {
			while (monkey.items.length) {
				let item = monkey.items.shift();
				item = reliefFn(monkey.worryFn(item));
				monkeys[monkey.throwTo[monkey.testFn(item)]].items.push(item);
				monkey.inspected++;
			}
		});
	}
	const inspected = monkeys.map((monkey) => monkey.inspected);
	inspected.sort((a, b) => b - a);
	return inspected[0] * inspected[1];
}

export function part01(input) {
	const monkeys = parseInput(input);
	return play(monkeys, 20, (x) => Math.floor(x / 3));
}

export function part02(input) {
	const monkeys = parseInput(input);
	const lcd = monkeys.reduce((lcd, monkey) => lcd * monkey.testValue, 1)
	return play(monkeys, 10000, (x) => x % lcd);
}

export async function day11() {
	const data = await readStrings("data/input11", "\n\n");

	console.log("\nDay 11 >>>");
	console.log("\tPart 1:", part01(data));
	console.log("\tPart 2:", part02(data));
}
