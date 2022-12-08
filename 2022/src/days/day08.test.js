import { readMatrix } from "../tools/data";
import { getScenicScore, part01, part02 } from "./day08";

describe("Day 08", () => {
	let data;

	beforeAll(async () => {
		data = await readMatrix("data/sample08");
	});

	describe("getScenicScore()", () => {
		it("should return the scenic score for given coordinates", () => {
			expect(getScenicScore(data, [1, 2])).toBe(4);
			expect(getScenicScore(data, [3, 2])).toBe(8);
			expect(getScenicScore(data, [2, 3])).toBe(2);
		});
	});

	describe("Part 01", () => {
		it("should return the correct result", () => {
			expect(part01(data)).toBe(21);
		});
	});

	describe("Part 02", () => {
		it("should return the correct result", () => {
			expect(part02(data)).toBe(8);
		});
	});
});
