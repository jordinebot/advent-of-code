// --- Day 10: Cathode-Ray Tube ---
import { readStrings } from "../tools/data";

export function part01(input) {
	const sampleAt = [20, 60, 100, 140, 180, 220];
	let signal = 0;
	let x = 1;
	let cycle = 0;
	while (input.length) {
		cycle++;
		if (sampleAt.includes(cycle)) {
			signal += x * cycle;
		}
		const instruction = input.shift();
		if (instruction !== "noop") {
			const [, value] = instruction.split(" ");
			cycle++;
			if (sampleAt.includes(cycle)) {
				signal += x * cycle;
			}
			x += Number(value);
		}
	}
	return signal;
}

const SCREEN_ROWS = 6;
const SCREEN_COLS = 40;
export function drawPixel(screen, cycle, x) {
	let pixel = ".";
	if (cycle % SCREEN_COLS >= x - 1 && cycle % SCREEN_COLS <= x + 1) {
		pixel = "#";
	}
	if (screen[screen.length - 1].length < SCREEN_COLS) {
		screen[screen.length - 1].push(pixel);
	} else {
		screen.push([pixel]);
	}
}

export function part02(input) {
	const screen = [['#']];
	let x = 1;

	for (let cycle = 1; cycle < SCREEN_COLS * SCREEN_ROWS; cycle++) {
		drawPixel(screen, cycle, x);
		const instruction = input.shift();
		if (instruction !== "noop") {
			const [, value] = instruction.split(" ");
			cycle++;
			x += Number(value);
			drawPixel(screen, cycle, x);
		}
	}

	return screen.map((row) => row.join(""));
}

export async function day10() {
	const data = await readStrings("data/input10");

	console.log("\nDay 10 >>>");
	console.log("\tPart 1:", part01(structuredClone(data)));
	console.log("\tPart 2:", part02(structuredClone(data)));
}
