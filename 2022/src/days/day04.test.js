import {readStrings} from '../tools/data';
import { part01, part02 } from "./day04";

describe("Day 04", () => {
	let data;

	beforeEach(async () => {
		const raw  = await readStrings("data/sample04");
		data = raw.map(r => r.split(','))
	});

	describe("Part 01", () => {
		it("should return the correct result", () => {
			expect(part01(data)).toBe(2);
		});
	});

	describe("Part 02", () => {
		it("should return the correct result", () => {
			expect(part02(data)).toBe(4);
		});
	});
});
