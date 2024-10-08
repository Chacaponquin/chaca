import { chaca } from "../../../src";
import { describe, expect, it } from "vitest";

describe("# OneOfArray Util Test", () => {
  it("Pass empty array", () => {
    const v = chaca.utils.oneOfArray([]);
    expect(v).toBe(undefined);
  });

  it("Pass a not array value", () => {
    expect(chaca.utils.oneOfArray(true as any)).toBe(undefined);
  });

  it("Pass an array of values", () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const v = chaca.utils.oneOfArray(values);
    expect(values.some((value) => value === v)).toBe(true);
  });
});
