import { readStrings } from "../tools/data";
import { part01, part02 } from "./day15";

describe("Day 15", () => {
	let data;
	beforeEach(async () => {
		data = await readStrings("data/sample15");
	});
	describe("Part 01", () => {
		it("should return the correct result", async () => {
			expect(part01(data)).toBe(26);
		});
	});
	describe("Part 02", () => {
		it("should return the correct result", async () => {
			expect(part02(data)).toEqual(26);
		});
	});
});
