import {readStrings} from '../tools/data';
import { part01, part02 } from "./day02";

describe("Day 02", () => {
	let data;

	beforeEach(async () => {
		data = await readStrings("data/sample02");
	});

	describe("Part 01", () => {
		it("should return the correct result", () => {
			expect(part01(data)).toBe(15);
		});
	});

	describe("Part 02", () => {
		it("should return the correct result", () => {
			expect(part02(data)).toBe(12);
		});
	});
});
