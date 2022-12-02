import { readNumbers } from "../tools/data";
import { arraySum } from "../tools/array";

export function sumElfCalories(input) {
	return input.reduce(
		(output, current) => {
			if (isNaN(current)) {
				output.push(0);
			} else {
				output[output.length - 1] +=  current;
			}
			return output;
		},
		[0]
	);
}

export function part01(input) {
	return Math.max(...sumElfCalories(input));
}

export function part02(input) {
	return arraySum(
		sumElfCalories(input)
			.sort((a, b) => b - a)
			.slice(0, 3)
	);
}

export async function day01() {
	const data = await readNumbers("data/input01");

	console.log("\nDay 1 >>>");
	console.log("\tPart 1:", part01(data));
	console.log("\tPart 2:", part02(data));
}
