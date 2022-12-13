// --- Day 13: Distress Signal ---
import { deepEqual } from "fast-equals";
import { readStrings } from "../tools/data";
import { arraySum } from "../tools/array";

function compare(a, b) {
	if (typeof a === "number" && typeof b === "number") {
		return a < b ;
	} else if (typeof a !== typeof b) {
		return typeof a === "number" ? compare([a], b) : compare(a, [b]);
	} else if (a.length === 0) {
		return true;
	} else if (a.length > 0 && b.length === 0) {
		return false;
	} else {
		const [a0, ...an] = a;
		const [b0, ...bn] = b;
		return deepEqual(a0, b0) ? compare(an, bn) : compare(a0, b0);
	}
}

function sort(a, b) {
	if (typeof a === "number" && typeof b === "number") {
		return a < b ? -1 : a === b ? 0 : 1;
	} else if (typeof a !== typeof b) {
		return typeof a === "number" ? sort([a], b) : sort(a, [b]);
	} else if (a.length === 0) {
		return -1;
	} else if (a.length > 0 && b.length === 0) {
		return 1;
	} else {
		const [a0, ...an] = a;
		const [b0, ...bn] = b;
		return deepEqual(a0, b0) ? 0 : sort(a0, b0);
	}
}

export function part01(input) {
	return arraySum(
		input.map((pair, index) => {
			const [a, b] = pair.split("\n").map((p) => eval(p));
			return compare(a, b) ? index + 1 : 0;
		})
	);
}

export function part02(input) {
	const dividers = [[[2]], [[6]]];
	const packets = [...dividers];
	input.forEach((pair) =>
		pair
			.split("\n")
			.map((p) => eval(p))
			.forEach((p) => packets.push(p))
	);
	packets.sort(sort);
	return packets.reduce((total, packet, index) => {
		return deepEqual(packet, dividers[0]) || deepEqual(packet, dividers[1])
			? total * (index + 1)
			: total;
	}, 1);
}

export async function day13() {
	const data = await readStrings("data/input13", "\n\n");

	console.log("\nDay 13 >>>");
	console.log("\tPart 1:", part01(data));
	console.log("\tPart 2:", part02(data));
}
