import { readStrings } from "../tools/data";
import { part01, part02, parseData } from "./day05";

describe("Day 05", () => {
	let data;

	beforeEach(async () => {
		data = await readStrings("data/sample05");
	});

	describe("Data parsing", () => {
		it("should create the stacks and the moves", () => {
			const { stacks, moves } = parseData(data);
			expect(stacks).toEqual([["Z", "N"], ["M", "C", "D"], ["P"]]);
			expect(moves).toEqual([
				[1, 1, 0],
				[3, 0, 2],
				[2, 1, 0],
				[1, 0, 1],
			]);
		});
	});

	describe("Part 01", () => {
		it("should return the correct result", () => {
			expect(part01(parseData(data))).toBe("CMZ");
		});
	});

	describe("Part 02", () => {
		it("should return the correct result", () => {
			expect(part02(parseData(data))).toBe("MCD");
		});
	});
});
