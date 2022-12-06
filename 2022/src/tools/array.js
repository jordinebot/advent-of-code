export function arraySum(a) {
	return a.reduce((total, current) => total + current, 0);
}

export function arrayChunks(a, size) {
	return a.reduce(
		(groups, current) => {
			if (groups[groups.length - 1].length < size) {
				groups[groups.length - 1].push(current);
			} else {
				groups.push([current]);
			}
			return groups;
		},
		[[]]
	);
}

export function range(a, b) {
	if (a > b) {
		return [];
	}
	return [...new Array(b - a + 1)].map((_, i) => a + i);
}
