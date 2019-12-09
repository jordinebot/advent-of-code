const puzzle = "402328-864247".split("-");

function digitify(number) {
	return `${number}`.split("");
}

/*
function hasDoubleDigit(strNumber) {
	return /(\d)\1/.test(strNumber);
}
*/

function hasExclusiveDoubleDigits(strNumber) {
	const matches = strNumber.match(/(\d)\1/);
	return !!matches && !new RegExp(`(${matches[1]})\\1{2,}`).test(strNumber);
}

function decreases(digits) {
	for (let i = 0; i < digits.length - 1; i++) {
		if (digits[i] > digits[i + 1]) return true;
	}
	return false;
}

const passwords = [];

/*
const FgRed = "\x1b[31m";
const FgGreen = "\x1b[32m";
*/
for (let p = puzzle[0]; p <= puzzle[1]; p++) {
	const s = `${p}`;
	const d = digitify(p);
	if (hasExclusiveDoubleDigits(s) && !decreases(d)) {
		passwords.push(p);
		// process.stdout.write(`${FgGreen}${p} `);
	} else {
		// process.stdout.write(`${FgRed}${p} `);
	}
}

console.log("[day-4] Answer:", passwords.length);
