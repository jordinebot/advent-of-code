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
	const pairs = {};
	for (let i = 0; i < template.length; i++) {
		const pair = template.slice(i, i + 2);
		if (pair.length === 2) {
			countPair(pair, pairs);
		}
	}
	return pairs;
}

function expand(pairs, rules, elements, steps) {
	for (let i = 0; i < steps; i++) {
		const newPairs = {};
		Object.entries(pairs).forEach(([pair, count]) => {
			const element = rules[pair];
			const pair1 = `${pair[0]}${element}`;
			const pair2 = `${element}${pair[1]}`;
			countPair(pair1, newPairs, count);
			countPair(pair2, newPairs, count);
			countElement(element, elements, count);
		});
		pairs = newPairs;
	}
	return Math.max(...Object.values(elements)) - Math.min(...Object.values(elements));
}

function initElements(template) {
	const elements = {};
	for (const element of template) {
		countElement(element, elements);
	}
	return elements;
}

function countPair(p, pairs, count = 1) {
	pairs[p] = pairs[p] !== undefined ? pairs[p] + count : count;
	return pairs;
}

function countElement(e, elements, count = 1) {
	elements[e] = elements[e] !== undefined ? elements[e] + count : count;
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
