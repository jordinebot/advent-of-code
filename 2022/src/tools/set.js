export function intersection(a, b) {
	const A = a instanceof Set ? a : new Set(Array.from(a));
	const B = b instanceof Set ? b : new Set(Array.from(b));
	return new Set([...A].filter((i) => B.has(i)));
}
