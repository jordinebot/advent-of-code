import { readStrings } from "../tools/data";
import { part01, part02 } from "./day13";

describe("Day 13", () => {
	let data;
	beforeEach(async () => {
		data = await readStrings("data/sample13", "\n\n");
	});
	describe("Part 01", () => {
		it("should return the correct result", async () => {
			expect(part01(data)).toBe(13);
		});
	});
	describe("Part 02", () => {
		it("should return the correct result", async () => {
			expect(part02(data)).toEqual(140);
		});
	});
});
