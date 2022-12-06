import { readStrings } from "../tools/data";
import { part01, part02 } from "./day06";

describe("Day 06", () => {
	let data;
	let cases1;
	let cases2;

	beforeAll(async () => {
		data = await readStrings("data/sample06");
		cases1 = data.map((item, index) => [item, [7, 5, 6, 10, 11][index]]);
		cases2 = data.map((item, index) => [item, [19, 23, 23, 29, 26][index]]);
	});

	describe("Part 01", () => {
		it("should return the correct result", () => {
			cases1.forEach(([datastream, marker]) =>
				expect(part01(datastream)).toBe(marker)
			);
		});
	});

	describe("Part 02", () => {
		it("should return the correct result", () => {
			cases2.forEach(([datastream, marker]) =>
				expect(part02(datastream)).toBe(marker)
			);
		});
	});
});
