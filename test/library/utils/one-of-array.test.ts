import { chaca } from "../../../src";
import { describe, expect, it } from "vitest";

describe("utils.oneOfArray", () => {
  it("empty array. should return undefined", () => {
    const v = chaca.utils.oneOfArray([]);
    expect(v).toBe(undefined);
  });

  it("[1, 2, 3, 4, 5]. should always return an element of the array", () => {
    const values = [1, 2, 3, 4, 5];

    for (let i = 0; i < 500; i++) {
      const v = chaca.utils.oneOfArray(values);
      expect(values).include(v);
    }
  });

  it("[1, 2, 3]. every element should be reachable", () => {
    const values = [1, 2, 3];
    const found = new Set<number>();

    for (let i = 0; i < 500 && found.size < values.length; i++) {
      found.add(chaca.utils.oneOfArray(values));
    }

    expect([...found].sort()).toEqual(values);
  });
});
