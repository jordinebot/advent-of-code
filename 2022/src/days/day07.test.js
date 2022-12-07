import { readStrings } from "../tools/data";
import { part01, part02 } from "./day07";

describe("Day 07", () => {
	let data;

	beforeAll(async () => {
		data = await readStrings("data/sample07");
	});

	describe("Part 01", () => {
		it("should return the correct result", () => {
			expect(part01(data)).toBe(95437);
		});
	});

	describe("Part 02", () => {
		it("should return the correct result", () => {
			expect(part02(data)).toBe(95437);
		});
	});
});
