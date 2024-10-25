import { chaca } from "../../../src";
import { describe, expect, it } from "vitest";

describe("util.replaceSymbols", () => {
  it("Pass only #. Should return a string with only numbers", () => {
    const val = chaca.utils.replaceSymbols("#####");

    let is = true;
    for (let i = 0; i < val.length && is; i++) {
      if (isNaN(Number(val[i]))) is = false;
    }

    expect(is).toBe(true);
  });
});
