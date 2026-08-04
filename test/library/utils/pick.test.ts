import { describe, expect, it } from "vitest";
import { chaca, ChacaError } from "../../../src";

describe("utils.pick", () => {
  it("values = [1, 2, 3, 4, 5] & count = 2. should return an array with unique numbers between 1 and 5", () => {
    for (let i = 0; i < 200; i++) {
      const values = [1, 2, 3, 4, 5];
      const value = chaca.utils.pick({ count: 2, values: values });

      expect(value).toHaveLength(2);

      for (const v of value) {
        expect(values).include(v);
        expect(value.filter((s) => s === v)).toHaveLength(1);
      }
    }
  });

  it("count = values.length. should return all elements in a new array", () => {
    const values = [1, 2, 3];
    const value = chaca.utils.pick({ values: values, count: 3 });

    expect(value).toEqual(expect.arrayContaining([1, 2, 3]));
    expect(value).toHaveLength(3);
    expect(value).not.toBe(values);
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
