import { modules } from "../../../src";
import { describe, expect, it } from "vitest";

const validate = (string: string, banned: string[]): boolean => {
  let val = true;
  for (let i = 0; i < string.length && val; i++) {
    for (const v of banned) {
      if (v === string[i]) val = false;
    }
  }
  return val;
};

describe("datatype.alphaNumeric", () => {
  it("no arguments. should return an string with the alphanumeric", () => {
    const val = modules.datatype.alphaNumeric();

    expect(val.length).toBeGreaterThanOrEqual(1);
    expect(val.length).toBeLessThanOrEqual(10);
  });

  describe("length argument", () => {
    it("length = 10. should return alphanumeric with size 10", () => {
      const val = modules.datatype.alphaNumeric({ length: 10 });

      expect(val).toHaveLength(10);
    });

    it("length = undefined. should return an string with length between 1 and 10", () => {
      const val = modules.datatype.alphaNumeric({ length: undefined });

      expect(val.length).toBeGreaterThanOrEqual(1);
      expect(val.length).toBeLessThanOrEqual(10);
    });
  });

  describe("prefix argument", () => {
    it("prefix = undefined. should return an alphanumeric string", () => {
      const value = modules.datatype.alphaNumeric({
        prefix: undefined,
        length: 10,
      });

      expect(value).toHaveLength(10);
    });

    it("prefix = 'foo'. should return an alphanumeric that starts with 'foo'", () => {
      const value = modules.datatype.alphaNumeric({
        prefix: "foo",
        length: 10,
      });

      expect(value.startsWith("foo")).toBe(true);
      expect(value).toHaveLength(10);
    });
  });

  describe("case argument", () => {
    it("case = undefined. should return an mixed case alphanumeric string", () => {
      const value = modules.datatype.alphaNumeric({
        case: undefined,
        length: 10,
      });

      expect(value).toHaveLength(10);
    });

    it("case = 'lower'. should return an lower case alphanumeric string", () => {
      const value = modules.datatype.alphaNumeric({
        case: "lower",
      });

      expect(value.toLowerCase()).toBe(value);
    });

    it("case = 'upper'. should return an upper case alphanumeric string", () => {
      const value = modules.datatype.alphaNumeric({
        case: "upper",
      });

      expect(value.toUpperCase()).toBe(value);
    });
  });

  describe("banned argument", () => {
    it("banned = 'b'. should return an string without b", () => {
      const val = modules.datatype.alphaNumeric({ length: 10, banned: "b" });

      expect(validate(val, ["b"])).toBe(true);
      expect(val).toHaveLength(10);
    });

    it("abnned = ['b', 'a', 'c', 'd', 'e']. should return an string without b, a, c, d and e", () => {
      const val = modules.datatype.alphaNumeric({
        length: 10,
        banned: ["a", "b", "c", "d", "e"],
        case: "lower",
      });
      expect(validate(val, ["a", "b", "c", "d", "e"])).toBe(true);
    });
  });
});
