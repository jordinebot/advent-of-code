import { readStrings } from "../tools/data";
import { intersection } from "../tools/set";
import { halve, isLower } from "../tools/string";
import { arrayChunks } from "../tools/array";

export function priority(char) {
	return isLower(char)
		? char.charCodeAt(0) - "a".charCodeAt(0) + 1
		: char.charCodeAt(0) - "A".charCodeAt(0) + 27;
}

export function part01(input) {
	return input
		.map(halve)
		.reduce(
			(total, [a, b]) =>
				total +
				priority([...intersection(a.split(""), b.split(""))][0]),
			0
		);
}

export function part02(input) {
	const CHUNK_SIZE = 3;
	return arrayChunks(input, CHUNK_SIZE)
		.map((group) =>
			group.slice(1).reduce((common, item) => {
				return intersection(common, item.split(""));
			}, new Set(group[0].split("")))
		)
		.reduce((total, current) => total + priority([...current][0]), 0);
}

export async function day03() {
	const data = await readStrings("data/input03");

	console.log("\nDay 3 >>>");
	console.log("\tPart 1:", part01(data));
	console.log("\tPart 2:", part02(data));
}
