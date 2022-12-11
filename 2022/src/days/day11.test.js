import { readStrings } from "../tools/data";
import { part01, part02 } from "./day11";

describe("Day 10", () => {
	let data;
	beforeEach(async () => (data = await readStrings("data/sample11", "\n\n")));

	describe("Part 01", () => {
		it("should return the correct result", async () => {
			expect(part01(data)).toBe(10605);
		});
	});
	describe("Part 02", () => {
		it("should return the correct result", async () => {
			expect(part02(data)).toEqual(2713310158);
		});
	});
});
