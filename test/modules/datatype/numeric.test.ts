import { describe, expect, it } from "vitest";
import { modules } from "../../../src";

const valid = (text: string, banned: string[]): boolean => {
  return text
    .split("")
    .every((v) => !Number.isNaN(Number(v)) && !banned.includes(v));
};

const hasLeadingZeros = (text: string): boolean => {
  let valid = false;

  for (const v of text) {
    if (v !== "0") {
      valid = false;
      break;
    }
  }

  return valid;
};

describe("datatype.numeric", () => {
  describe("allowLeadingZeros argument", () => {
    it("allowLeadingZeros = undefined. should return a numeric string with at least a leading 0", () => {
      const value = modules.datatype.numeric({
        banned: modules.datatype.constants.numbers.filter((v) => v !== "0"),
        length: 5,
        allowLeadingZeros: undefined,
      });

      expect(value).toBe("00000");
    });

    it("allowLeadingZeros = true. should return a numeric string with at least a leading 0", () => {
      const value = modules.datatype.numeric({
        banned: modules.datatype.constants.numbers.filter((v) => v !== "0"),
        length: 5,
        allowLeadingZeros: true,
      });

      expect(value).toBe("00000");
    });

    it("allowLeadingZeros = false. should return a numeric string without leading zeros", () => {
      const value = modules.datatype.numeric({
        banned: modules.datatype.constants.numbers.filter((v) => v !== "0"),
        length: 5,
        allowLeadingZeros: false,
      });

      expect(hasLeadingZeros(value)).toBe(false);
    });
  });

  describe("prefix argument", () => {
    it("prefix = undefined. should return an alphanumeric string", () => {
      const value = modules.datatype.numeric({
        prefix: undefined,
        length: 10,
      });

      expect(value).toHaveLength(10);
    });

    it("prefix = 'foo'. should return an alphanumeric that starts with 'foo'", () => {
      const value = modules.datatype.numeric({
        prefix: "foo",
        length: 10,
      });

      expect(value.startsWith("foo")).toBe(true);
      expect(value).toHaveLength(10);
    });
  });

  describe("banned argument", () => {
    it("banned = undefined. should return a numeric string", () => {
      const value = modules.datatype.numeric({ banned: undefined });

      expect(valid(value, [])).toBe(true);
    });

    it("banned = ['2', '4']. should return a numeric string without 2 and 4", () => {
      const value = modules.datatype.numeric({ banned: ["2", "4"] });

      expect(valid(value, ["2", "4"])).toBe(true);
    });

    it("banned = all numbers. should return an empty string", () => {
      const value = modules.datatype.numeric({
        banned: modules.datatype.constants.numbers,
      });

      expect(value).toBe("");
    });
  });

  describe("length and prefix arguments", () => {
    it("length = 4 & prefix = 'foo'. should return a string with length 4", () => {
      const value = modules.datatype.numeric({ length: 4, prefix: "foo" });

      expect(value).toHaveLength(4);
    });

    it("length = 4 & prefix = 'foofoo'. Should return 'foof'", () => {
      const value = modules.datatype.numeric({
        length: 4,
        prefix: "foofoo",
      });

      expect(value).toBe("foof");
    });

    it("length = 0 & prefix = 'foo'. should return an empty array", () => {
      const value = modules.datatype.numeric({
        length: 0,
        prefix: "foo",
      });

      expect(value).toBe("");
    });
  });

  describe("length argument", () => {
    it("length = 10. should return alphanumeric with size 10", () => {
      const val = modules.datatype.numeric({ length: 10 });

      expect(val).toHaveLength(10);
    });

    it("length = -5. should return a string with length greater than 4", () => {
      const val = modules.datatype.numeric({ length: -5 });

      expect(val.length).toBeGreaterThanOrEqual(4);
    });

    it("length = 0. should return an empty string", () => {
      const val = modules.datatype.numeric({ length: 0 });

      expect(val).toHaveLength(0);
    });

    it("length = undefined. should return an string with length between 1 and 10", () => {
      const val = modules.datatype.numeric({ length: undefined });

      expect(val.length).toBeGreaterThanOrEqual(1);
      expect(val.length).toBeLessThanOrEqual(10);
    });
  });
});
