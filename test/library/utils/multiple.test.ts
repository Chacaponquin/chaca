import { describe, expect, expectTypeOf, it } from "vitest";
import { chaca } from "../../../src";

describe("utils.multiple", () => {
  describe("generator argument", () => {
    it("always return undefined. should return an undefined array", () => {
      const value = chaca.utils.multiple({
        generator: () => undefined,
        count: 3,
      });

      expectTypeOf(value).toBeArray();
      expect(value).toEqual([undefined, undefined, undefined]);
      expect(value).toHaveLength(3);
    });
  });

  describe("count argument", () => {
    it("count = 0. should return an empty array", () => {
      const value = chaca.utils.multiple({ generator: () => 5, count: 0 });

      expectTypeOf(value).toBeArray();
      expect(value).toHaveLength(0);
    });

    it("count = 3. should return an array with 3 elements", () => {
      const value = chaca.utils.multiple({ generator: () => 5, count: 3 });

      expectTypeOf(value).toBeArray();
      expect(value).toEqual([5, 5, 5]);
      expect(value).toHaveLength(3);
    });

    it("count = -3. should return an empty array", () => {
      const value = chaca.utils.multiple({
        generator: () => 5,
        count: -3,
      });

      expectTypeOf(value).toBeArray();
      expect(value).toHaveLength(0);
    });
  });
});
