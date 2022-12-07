import { readStrings } from "../tools/data";
import { arraySum } from "../tools/array";

const THRESHOLD = 100000;
const DISK_SIZE = 70000000;
const REQUIRED_SIZE = 30000000;

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

export function filesystem(input) {
	const system = {};
	let pwd = "";
	input.forEach(($) => {
		if (/^\$ cd/.test($)) {
			pwd = chdir($, pwd);
		}
		if (/^\$ ls/.test($)) {
			system[pwd] = 0;
		}
		if (/^\d+/.test($)) {
			const [size] = $.split(" ");
			system[pwd] += Number(size);
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
			(total, current) => total + system[current],
			0
		);
	});
	return sizes;
}

export function part01(input) {
	const system = filesystem(input);
	const sizes = du(system);
	return arraySum(Object.values(sizes).filter((s) => s < THRESHOLD));
}

export function part02(input) {
	const system = filesystem(input);
	const sizes = du(system);
	const freeSpace = DISK_SIZE - sizes["/"];
	const candidates = Object.entries(sizes).filter(
		([folder, size]) => freeSpace + size >= REQUIRED_SIZE
	);
	candidates.sort((a, b) => a[1] - b[1]);
	return candidates[0][1];
}

export async function day07() {
	const data = await readStrings("data/input07");

	console.log("\nDay 7 >>>");
	console.log("\tPart 1:", part01(data));
	console.log("\tPart 2:", part02(data));
}
