import { describe, expect, it } from "vitest";
import { chaca, ChacaError } from "../../../src";

describe("utils.pick", () => {
  it("values = [1, 2, 3, 4, 5] & count = 2. should return an array with unique numbers between 1 and 5", () => {
    const value = chaca.utils.pick({ count: 2, values: [1, 2, 3, 4, 5] });

    for (const v of value) {
      expect(value.filter((s) => s === v)).toHaveLength(1);
    }
  });

  describe("count argument", () => {
    it("values = [1, 2, 3] & count = 4. should throw an error", () => {
      expect(() => chaca.utils.pick({ values: [1, 2, 3], count: 4 })).toThrow(
        ChacaError,
      );
    });

    it("count = -1. should return an empty array", () => {
      const values = chaca.utils.pick({ values: [1, 2, 3], count: -1 });

      expect(values).toEqual([]);
    });

    it("values = [] & count = 0. should return an empty array", () => {
      const value = chaca.utils.pick({ values: [], count: 0 });

      expect(value).toEqual([]);
    });
  });
});
