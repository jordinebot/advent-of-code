import { readStrings } from "../tools/data";

const THRESHOLD = 100000;

export function chdir($, current) {
	const path = $.replace("$ cd ", "");
	if (path === "..") {
		const folders = current.split("/");
		folders.pop();
		return folders.join("/");
	} else {
		return `${current}/${path}`.replace("//", "/");
	}
}

export function explore(input) {
	const system = {};
	let pwd = "";
	input.forEach(($) => {
		if (/^\$ cd/.test($)) {
			pwd = chdir($, pwd);
		}
		if (/^\$ ls/.test($)) {
			system[pwd] = [];
		}
		if (/^\d+/.test($)) {
			const [size] = $.split(" ");
			system[pwd].push(Number(size));
		}
	});
	return system;
}

export function du(system) {
	const sizes = {};
	const paths = Object.keys(system);
	paths.forEach((path) => {
		const includes = paths.filter((p) => p.includes(path));
		sizes[path] = includes.reduce(
			(total, current) =>
				total +
				system[current].reduce((partial, size) => partial + size, 0),
			0
		);
	});
	return sizes;
}

export function part01(input) {
	const system = explore(input);
	const sizes = du(system);
	return Object.values(sizes)
		.filter((s) => s < THRESHOLD)
		.reduce((total, current) => total + current, 0);
}

export function part02(input) {
	return input;
}

export async function day07() {
	const data = await readStrings("data/input07");

	console.log("\nDay 7 >>>");
	console.log("\tPart 1:", part01(data));
	console.log("\tPart 2:", part02(data));
}
