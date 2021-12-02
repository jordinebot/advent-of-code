export const countIncrements = (array) =>
	array.filter((item, index, items) => index > 0 && item > items[index - 1]).length;

export const sumArray = (array) => array.reduce((total, num) => total + num, 0);


