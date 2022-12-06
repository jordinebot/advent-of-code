import { readStrings } from "../tools/data";
import { range } from "../tools/array";
import { intersection } from "../tools/set";

export function contains([[startA, endA], [startB, endB]]) {
	return (
		(startA <= startB && endA >= endB) || (startA >= startB && endA <= endB)
	);
}

export function overlaps([[startA, endA], [startB, endB]]) {
	return (
		intersection(range(startA, endA), range(startB, endB)).size > 0
	);
}

export function part01(input) {
	return input.reduce(
		(total, current) =>
			total +
			contains(
				current.map((c) => c.split("-").map((d) => parseInt(d, 10)))
			),
		0
	);
}

export function part02(input) {
	return input.reduce(
		(total, current) =>
			total +
			overlaps(
				current.map((c) => c.split("-").map((d) => parseInt(d, 10)))
			),
		0
	);
}

export async function day04() {
	const data = await readStrings("data/input04");
	const parsed = data.map((d) => d.split(","));

	console.log("\nDay 4 >>>");
	console.log("\tPart 1:", part01(parsed));
	console.log("\tPart 2:", part02(parsed));
}
