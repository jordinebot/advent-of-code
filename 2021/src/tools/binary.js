export function not(bit) {
	return bit === '1' ? '0' : '1';
}

export function binaryArray(binaryString) {
	return binaryString.split('').map((bit) => (bit === '1' ? 1 : 0));
}
