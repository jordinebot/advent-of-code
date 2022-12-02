import { readNumbers } from "../tools/data";
import { part01, part02, sumElfCalories } from "./day01";

describe("Day 01", () => {
	let data;

	beforeEach(async () => {
		data = await readNumbers("data/sample01");
	});

	describe("sumElfCalories()", () => {
		it("should sum groups of calories", () => {
			expect(sumElfCalories(data)).toEqual([
				6000, 4000, 11000, 24000, 10000,
			]);
		});
	});

	describe("Part 01", () => {
		it("should return the correct result", () => {
			expect(part01(data)).toBe(24000);
		});
	});

	describe("Part 02", () => {
		it("should return the correct result", () => {
			expect(part02(data)).toBe(45000);
		});
	});
});
