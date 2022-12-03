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
	)
}