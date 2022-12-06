import * as A from "./array";

describe("range()", () => {
	it("should return empty array for inconsistent limits", () => {
		expect(A.range(4, 2)).toEqual([]);
	});
	it("should return a range between start and end", () => {
		expect(A.range(2, 8)).toEqual([2, 3, 4, 5, 6, 7, 8]);
	});
});
