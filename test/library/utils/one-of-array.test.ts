import { chaca } from "../../../src";
import { describe, expect, it } from "vitest";

describe("utils.oneOfARRAY", () => {
  it("empty array. should return undefined", () => {
    const v = chaca.utils.oneOfArray([]);
    expect(v).toBe(undefined);
  });

  it("[1, 2, 3, 4, 5]. should return a number between 1 and 5", () => {
    const values = [1, 2, 3, 4, 5];
    const v = chaca.utils.oneOfArray(values);
    expect(values.some((value) => value === v)).toBe(true);
  });
});
