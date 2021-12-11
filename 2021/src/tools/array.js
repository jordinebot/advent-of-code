export function countIncrements(a) {
	return a.filter((item, index, items) => index > 0 && item > items[index - 1]).length;
}

export function sum(a) {
	return a.reduce((total, current) => total + current, 0);
}

export function median(a) {
	return a.slice().sort((a, b) => a - b)[Math.floor(a.length / 2)];
}

export function mean(a) {
	return sum(a) / a.length;
}

export function sumArrays(a, b) {
	return a.reduce((total, current, index) => {
		total[index] = current + (b[index] ?? 0);
		return total;
	}, Array(a.length).fill(0));
}

export function range(start, end) {
	return Array(end - start + 1)
		.fill()
		.map((_, i) => start + i);
}
