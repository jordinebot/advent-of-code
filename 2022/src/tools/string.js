import { intersection } from "./set";

export function halve(str) {
	return [str.substring(0, str.length / 2), str.substring(str.length / 2)];
}

export function isLower(char) {
	return char === char.toLowerCase();
}

export function isUpper(char) {
	return char === char.toUpperCase();
}