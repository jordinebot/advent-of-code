import { readStrings } from "../tools/data";

const START_OF_PACKET_SIZE = 4;
const START_OF_MESSAGE_SIZE = 14;

export function isMarker(input, size) {
	return new Set(input.split('')).size === size
}

export function findMarker(input, size) {
	for (let i = size; i < input.length; i++) {
		const candidate = input.substring(i - size, i);
		if (isMarker(candidate, size)) {
			return i;
		}
	}
	return undefined;
}

export function part01(input) {
	return findMarker(input, START_OF_PACKET_SIZE)
}

export function part02(input) {
	return findMarker(input, START_OF_MESSAGE_SIZE)
}

export async function day06() {
	const data = await readStrings("data/input06");

	console.log("\nDay 6 >>>");
	console.log("\tPart 1:", part01(data[0]));
	console.log("\tPart 2:", part02(data[0]));
}
