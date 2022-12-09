import { readStrings } from "../tools/data";
import { part01, part02 } from "./day09";

describe("Day 09", () => {
	let data;

	beforeAll(async () => {
		data = await readStrings("data/sample09");
	});

	describe("Part 01", () => {
		it("should return the correct result", () => {
			expect(part01(data)).toBe(13);
		});
	});

	describe("Part 02", () => {
		it("should return the correct result", () => {
			expect(part02(data)).toBe(8);
		});
	});
});
