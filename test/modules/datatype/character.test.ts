import { describe, expect, it } from "vitest";
import { modules } from "../../../src";

describe("datatype.character", () => {
  it("no arguments. should return a mixed case character", () => {
    const value = modules.datatype.character();

    expect(modules.datatype.constants.mixedCharacters).include(value);
    expect(value).toHaveLength(1);
  });

  describe("case argument", () => {
    it("case = undefined. should return a mixed case character", () => {
      const value = modules.datatype.character({ case: undefined });

      expect(modules.datatype.constants.mixedCharacters).include(value);
      expect(value).toHaveLength(1);
    });

    it("case = 'mixed'. should return a mixed case character", () => {
      const value = modules.datatype.character({ case: "mixed" });

      expect(modules.datatype.constants.mixedCharacters).include(value);
      expect(value).toHaveLength(1);
    });

    it("case = 'lower'. should return a lower case character", () => {
      const value = modules.datatype.character({ case: "lower" });

      expect(modules.datatype.constants.lowerCharacters).include(value);
      expect(value).toHaveLength(1);
    });

    it("case = 'upper'. should return an upper case character", () => {
      const value = modules.datatype.character({ case: "upper" });

      expect(modules.datatype.constants.upperCharacters).include(value);
      expect(value).toHaveLength(1);
    });
  });
});
