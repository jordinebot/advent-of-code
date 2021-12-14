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

function getPairs(template) {
	const pairs = [];
	for (let i = 0; i < template.length; i++) {
		const pair = template.slice(i, i + 2);
		if (pair.length === 2) {
			pairs.push(pair);
		}
	}
	return pairs;
}

function expand(pairs, rules, elements, steps) {
	if (steps <= 0) {
		return Math.max(...Object.values(elements)) - Math.min(...Object.values(elements));
	} else {
		const expanded = [];
		pairs.forEach((pair) => {
			const element = rules[pair];
			countElement(element, elements);
			expanded.push(`${pair[0]}${element}`);
			expanded.push(`${element}${pair[1]}`);
		});
		return expand(expanded, rules, elements, steps - 1);
	}
}

function initElements(template) {
	const elements = {};
	for (const element of template) {
		countElement(element, elements);
	}
	return elements;
}

function countElement(e, elements) {
	elements[e] = elements[e] !== undefined ? elements[e] + 1 : 1;
	return elements;
}

function part1(pairs, rules, elements) {
	return expand(pairs, rules, elements, 10);
}

function part2(pairs, rules, elements) {
	return expand(pairs, rules, elements, 40);

}

export async function day14() {
	const data = await readStrings('data/input14');

	const [template, rules] = parseData(data);
	const pairs = getPairs(template);

	console.log('\nDay 14 >>>');
	console.log('    Part 1:', part1(pairs, rules, initElements(template)));
	console.log('    Part 2:', part2(pairs, rules, initElements(template)));
}
