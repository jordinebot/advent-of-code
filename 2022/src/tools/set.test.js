import { intersection } from "./set";

describe("intersection()", () => {
	it("should return the intersection between two sets", () => {
		expect(
			intersection("vJrwpWtwJgWr".split(""), "hcsFMMfFFhFp".split(""))
		).toEqual(new Set(["p"]));
	});
});
