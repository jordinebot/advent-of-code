import { readStrings } from "../tools/data";
import { part01, part02 } from "./day03";

describe("Day 03", () => {
	let data;

	beforeEach(async () => {
		data = await readStrings("data/sample03");
	});

	describe("Part 01", () => {
		it("should return the correct result", () => {
			expect(part01(data)).toBe(157);
		});
	});

	describe("Part 02", () => {
		it("should return the correct result", () => {
			expect(part02(data)).toBe(70);
		});
	});
});
