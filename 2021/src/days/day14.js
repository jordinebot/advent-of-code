import { readStrings } from '../tools/data';

function parseData(input) {
	const template = input[0];
	const rules = input.splice(2).reduce((rules, rule) => {
		const [pair, output] = rule.split(' -> ');
		rules[pair] = output;
		return rules;
	}, {});
	return [template, rules];
}

function expand(template, rules) {
	let polymer = template.split('');
	let inserted = 0;
	for (let i = 0; i < template.length; i++) {
		const pair = template.slice(i, i + 2);
		if (pair.length === 2) {
			polymer.splice(i + inserted + 1, 0, rules[pair]);
			inserted++;
		}
	}
	return polymer.join('');
}

function countElements(polymer) {
	const elements = {};
	for (const element of polymer) {
		elements[element] = elements[element] ? elements[element] + 1 : 1;
	}
	return elements;
}
function lessCommonQty(polymer) {
	const count = countElements(polymer);
	return Object.values(count).reduce(
		(lessCommon, current) => (current < lessCommon ? current : lessCommon),
		Infinity
	);
}
function mostCommonQty(polymer) {
	const count = countElements(polymer);
	return Object.values(count).reduce(
		(mostCommon, current) => (current > mostCommon ? current : mostCommon),
		-Infinity
	);
}

function part1(template, rules) {
	let steps = 10;
	let polymer = template;

	while (steps-- > 0) {
		polymer = expand(polymer, rules);
	}

	const mcq = mostCommonQty(polymer);
	const lcq = lessCommonQty(polymer);

	return mcq - lcq;
}
function part2(template, rules) {
	let steps = 40;
	let polymer = template;

	while (steps-- > 0) {
		polymer = expand(polymer, rules);
	}

	const mcq = mostCommonQty(polymer);
	const lcq = lessCommonQty(polymer);

	return mcq - lcq;

}

export async function day14() {
	// const data = await readStrings('data/sample14');
	const data = await readStrings('data/input14');

	const [template, rules] = parseData(data);

	console.log('\nDay 14 >>>');
	console.log('    Part 1:', part1(template, rules));
	console.log('    Part 2:\n', part2(template, rules));
}
