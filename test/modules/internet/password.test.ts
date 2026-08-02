import { modules } from "../../../src";
import { describe, expect, it } from "vitest";

describe("internet.password", () => {
  it("no arguments. should return a password with default length 15", () => {
    const value = modules.internet.password();

    expect(value).toHaveLength(15);
  });

  describe("length argument", () => {
    it("length = 10. should return a password with length 10", () => {
      const value = modules.internet.password({ length: 10 });

      expect(value).toHaveLength(10);
    });
  });

  describe("memorable argument", () => {
    it("memorable = true & length = 12. should return a 12-char password of lowercase letters", () => {
      const value = modules.internet.password({ memorable: true, length: 12 });

      expect(value).toHaveLength(12);
      expect(value).toMatch(/^[a-z]+$/);
    });
  });

  describe("prefix argument", () => {
    it("prefix = 'abc' & length = 10. should start with the prefix and have length 10", () => {
      const value = modules.internet.password({ prefix: "abc", length: 10 });

      expect(value.startsWith("abc")).toBe(true);
      expect(value).toHaveLength(10);
    });

    it("prefix longer than length. prefix = 'abcdef' & length = 3. should return the prefix as-is", () => {
      const value = modules.internet.password({ prefix: "abcdef", length: 3 });

      expect(value).toBe("abcdef");
    });
  });
});
