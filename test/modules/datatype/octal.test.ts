import { describe, expect, it } from "vitest";
import { modules } from "../../../src";

describe("datatype.octal", () => {
  it("no arguments. should return a string with length greater than 4", () => {
    const value = modules.datatype.octal();

    expect(value.length).toBeGreaterThanOrEqual(4);
  });

  describe("length and prefix arguments", () => {
    it("length = 4 & prefix = 'foo'. should return a string with length 4", () => {
      const value = modules.datatype.octal({ length: 4, prefix: "foo" });

      expect(value).toHaveLength(4);
    });

    it("length = 4 & prefix = 'foofoo'. Should return 'foof'", () => {
      const value = modules.datatype.octal({
        length: 4,
        prefix: "foofoo",
      });

      expect(value).toBe("foof");
    });

    it("length = 0 & prefix = 'foo'. should return an empty array", () => {
      const value = modules.datatype.octal({
        length: 0,
        prefix: "foo",
      });

      expect(value).toBe("");
    });
  });

  describe("length argument", () => {
    it("length = undefined. should return a string with length greather than 4", () => {
      const value = modules.datatype.octal({ length: undefined });

      expect(value.length).toBeGreaterThanOrEqual(4);
    });

    it("length = -4. should return a string with length greather than 4", () => {
      const value = modules.datatype.octal({ length: -4 });

      expect(value.length).toBeGreaterThanOrEqual(4);
    });

    it("length = 4. should return a string with length 4", () => {
      const value = modules.datatype.octal({ length: 4 });

      expect(value).toHaveLength(4);
    });

    it("length = 0. should return a string with length 0", () => {
      const value = modules.datatype.octal({ length: 0 });

      expect(value).toHaveLength(0);
    });
  });
});
