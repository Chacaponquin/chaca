import { describe, expect, it } from "vitest";
import { modules } from "../../../src";

const valid = (text: string): boolean => {
  return text.split("").every((v) => Number(v) === 0 || Number(v) === 1);
};

describe("datatype.binaryCode", () => {
  it("no arguments. should return a string with length greather than 4", () => {
    const value = modules.datatype.binaryCode();

    expect(value.length).toBeGreaterThanOrEqual(4);
  });

  describe("length and prefix arguments", () => {
    it("length = 4 & prefix = 'foo'. should return 'foo1' or 'foo0'", () => {
      const value = modules.datatype.binaryCode({ length: 4, prefix: "foo" });

      expect(["foo1", "foo0"]).includes(value);
    });

    it("length = 4 & prefix = 'foofoo'. Should return 'foof'", () => {
      const value = modules.datatype.binaryCode({
        length: 4,
        prefix: "foofoo",
      });

      expect(value).toBe("foof");
    });

    it("length = 0 & prefix = 'foo'. should return an empty array", () => {
      const value = modules.datatype.binaryCode({
        length: 0,
        prefix: "foo",
      });

      expect(value).toBe("");
    });
  });

  describe("prefix argument", () => {
    it("prefix = undefined", () => {
      const value = modules.datatype.binaryCode({ prefix: undefined });

      expect(valid(value)).toBe(true);
    });

    it("prefix = 'foo foo foo'. should return an string that starts with 'foo foo foo'", () => {
      const value = modules.datatype.binaryCode({ prefix: "foo foo foo" });

      expect(value.startsWith("foo foo foo")).toBe(true);
    });

    it("prefix = 'foo'. should return an string that starts with 'foo'", () => {
      const value = modules.datatype.binaryCode({ prefix: "foo" });

      expect(value.startsWith("foo")).toBe(true);
    });
  });

  describe("length argument", () => {
    it("length = undefined. should return a string with length greather than 4", () => {
      const value = modules.datatype.binaryCode({ length: undefined });

      expect(value.length).toBeGreaterThanOrEqual(4);
      expect(valid(value)).toBe(true);
    });

    it("length = -4. should return a string with length greather than 4", () => {
      const value = modules.datatype.binaryCode({ length: -4 });

      expect(value.length).toBeGreaterThanOrEqual(4);
      expect(valid(value)).toBe(true);
    });

    it("length = 4. should return a string with length 4", () => {
      const value = modules.datatype.binaryCode({ length: 4 });

      expect(value).toHaveLength(4);
      expect(valid(value)).toBe(true);
    });

    it("length = 0. should return a string with length 0", () => {
      const value = modules.datatype.binaryCode({ length: 0 });

      expect(value).toHaveLength(0);
      expect(valid(value)).toBe(true);
    });
  });
});
