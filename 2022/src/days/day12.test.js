import { readStrings } from "../tools/data";
import { part01, part02 } from "./day12";

describe("Day 12", () => {
	let data;
	beforeEach(async () => {
		data = await readStrings("data/sample12", "\n", (line) =>
			line.split("")
		);
	});
	describe("Part 01", () => {
		it("should return the correct result", async () => {
			expect(part01(data)).toBe(31);
		});
	});
	describe("Part 02", () => {
		it("should return the correct result", async () => {
			expect(part02(data)).toEqual(29);
		});
	});
});
