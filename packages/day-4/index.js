const puzzle = "402328-864247".split("-");

function digitify(number) {
	return `${number}`.split("");
}

function hasDoubleDigit(digits) {
	for (let i = 1; i < digits.length; i++) {
		if (digits[i] === digits[i - 1]) return true;
	}
	return false;
}

function decreases(digits) {
	for (let i = 0; i < digits.length - 1; i++) {
		if (digits[i] > digits[i + 1]) return true;
	}
	return false;
}

const passwords = [];
for (let p = puzzle[0]; p <= puzzle[1]; p++) {
	const d = digitify(p);
	if (hasDoubleDigit(d) && !decreases(d)) passwords.push(p);
}

console.log("[day-4] Answer:", passwords.length);
