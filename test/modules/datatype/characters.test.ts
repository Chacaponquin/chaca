import { describe, expect, it } from "vitest";
import { modules } from "../../../src";

describe("datatype.characters", () => {
  describe("length argument", () => {
    it("length = 5. should return a value with 5 length", () => {
      const value = modules.datatype.characters({ length: 5 });

      expect(value).toHaveLength(5);
    });

    it("length = unedfined. should return a value with length between 5 and 10", () => {
      const value = modules.datatype.characters({ length: undefined });

      expect(value.length).toBeGreaterThanOrEqual(5);
      expect(value.length).toBeLessThanOrEqual(10);
    });
  });

  describe("case argument", () => {
    it("case = undefined. should return an mixed case value", () => {
      const value = modules.datatype.characters({ case: undefined });

      value.split("").forEach((v) => {
        expect(modules.datatype.constants.mixedCharacters).include(v);
      });
    });

    it("case = 'mixed'. should return a mixed case value", () => {
      const value = modules.datatype.characters({ case: "mixed" });

      value.split("").forEach((v) => {
        expect(modules.datatype.constants.mixedCharacters).include(v);
      });
    });

    it("case = 'lower'. should return a lower case value", () => {
      const value = modules.datatype.characters({ case: "lower" });

      value.split("").forEach((v) => {
        expect(modules.datatype.constants.lowerCharacters).include(v);
      });
    });

    it("case = 'upper'. should return an upper case value", () => {
      const value = modules.datatype.characters({ case: "upper" });

      value.split("").forEach((v) => {
        expect(modules.datatype.constants.upperCharacters).include(v);
      });
    });
  });
});
