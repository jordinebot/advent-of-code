import { readStrings } from "../tools/data";
import { part01, part02 } from "./day10";

describe("Day 10", () => {
	let data;
	beforeEach(async () => (data = await readStrings("data/sample10")));

	describe("Part 01", () => {
		it("should return the correct result", async () => {
			expect(part01(data)).toBe(13140);
		});
	});
	describe("Part 02", () => {
		it("should return the correct result", async () => {
			expect(part02(data)).toEqual([
				"##..##..##..##..##..##..##..##..##..##..",
				"###...###...###...###...###...###...###.",
				"####....####....####....####....####....",
				"#####.....#####.....#####.....#####.....",
				"######......######......######......####",
				"#######.......#######.......#######.....",
			]);
		});
	});
});
