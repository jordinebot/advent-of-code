import { readStrings } from "../tools/data";
import { part01, part02 } from "./day14";

describe("Day 14", () => {
	let data;
	beforeEach(async () => {
		data = await readStrings("data/sample14");
	});
	describe("Part 01", () => {
		it("should return the correct result", async () => {
			expect(part01(data)).toBe(24);
		});
	});
	describe("Part 02", () => {
		it("should return the correct result", async () => {
			expect(part02(data)).toEqual(93);
		});
	});
});
