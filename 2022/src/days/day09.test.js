import { readStrings } from "../tools/data";
import { part01, part02 } from "./day09";

describe("Day 09", () => {
	let data;

	describe("Part 01", () => {
		it("should return the correct result", async () => {
			data = await readStrings("data/sample09");
			expect(part01(data)).toBe(13);
		});
	});
	describe("Part 02", () => {
		it("should return the correct result", async () => {
			data = await readStrings("data/sample09");
			expect(part02(data)).toBe(1);
		});
		it("should return the correct result", async () => {
			data = await readStrings("data/sample09b");
			expect(part02(data)).toBe(36);
		});
	});
});
