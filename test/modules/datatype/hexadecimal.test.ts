import { describe, expect, it } from "vitest";
import { modules } from "../../../src";

describe("datatype.hexadecimal", () => {
  describe("length argument", () => {
    it("length = 10. should return a hexadecimal with length 10", () => {
      const value = modules.datatype.hexadecimal({ length: 10 });

      expect(value).toHaveLength(10);
    });

    it("length = 0. should return a hexadecimal with length 0", () => {
      const value = modules.datatype.hexadecimal({ length: 0 });

      expect(value).toHaveLength(0);
    });

    it("length = undefined. should return a hexadecimal with length between 5 and 10", () => {
      const value = modules.datatype.hexadecimal({ length: undefined });

      expect(value.length).toBeGreaterThanOrEqual(5);
      expect(value.length).toBeLessThanOrEqual(10);
    });

    it("length = -5. should return a hexadecimal with length between 5 and 10", () => {
      const value = modules.datatype.hexadecimal({ length: -5 });

      expect(value.length).toBeGreaterThanOrEqual(5);
      expect(value.length).toBeLessThanOrEqual(10);
    });
  });

  describe("case argument", () => {
    it("case = 'lower'. should return an lower case hexadecimal value", () => {
      const value = modules.datatype.hexadecimal({ case: "lower" });

      expect(value).toBe(value.toLowerCase());
    });

    it("case = 'upper'. should return a lower case hexadecimal value", () => {
      const value = modules.datatype.hexadecimal({ case: "lower" });

      expect(value).toBe(value.toUpperCase());
    });

    it("case = undefined. should return a mixed case hexadecimal value", () => {
      const value = modules.datatype.hexadecimal({ case: undefined });

      expect(typeof value).toBe("string");
    });
  });
});
