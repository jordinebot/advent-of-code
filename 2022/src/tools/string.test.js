import * as S from "./string";

describe("halve()", () => {
	it("should return two halves of a string", () => {
		expect(S.halve("vJrwpWtwJgWrhcsFMMfFFhFp")).toEqual([
			"vJrwpWtwJgWr",
			"hcsFMMfFFhFp",
		]);
	});
});

describe("isLower()", () => {
	it("should return true if a char is lowercase", () => {
		expect(S.isLower("a")).toBe(true);
		expect(S.isLower("B")).toBe(false);
	});
});

describe("isUpper()", () => {
	it("should return true if a char is uppercase", () => {
		expect(S.isUpper("A")).toBe(true);
		expect(S.isUpper("b")).toBe(false);
	});
});
