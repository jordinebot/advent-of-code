export function countIncrements(a) {
	return a.filter((item, index, items) => index > 0 && item > items[index - 1]).length;
}

export function sum(a) {
	return a.reduce((total, current) => total + current, 0);
}
