import { describe, expect, it } from "vitest";
import { modules } from "../../../src";

describe("science.unit", () => {
  it("no arguments. should return an unit name", () => {
    const value = modules.science.unit();

    expect(modules.science.constants.units.map((u) => u.unit)).include(value);
  });

  describe("type argument", () => {
    it("type = 'symbol'. should return an unit symbol", () => {
      const value = modules.science.unit({ type: "symbol" });

      expect(modules.science.constants.units.map((u) => u.symbol)).include(
        value,
      );
    });
  });
});
