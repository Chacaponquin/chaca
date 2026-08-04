import { modules } from "../../../src";
import { describe, expect, it } from "vitest";

describe("phone.number", () => {
  it("no arguments. should return a phone prefix followed by ' ### ### ##' with digits", () => {
    for (let i = 0; i < 100; i++) {
      const value = modules.phone.number();

      expect(value).toMatch(/ \d{3} \d{3} \d{2}$/);

      // remove the trailing " ### ### ##" part (11 chars) to get the prefix,
      // since some prefix codes contain spaces themselves
      const prefix = value.slice(0, -11);
      expect(modules.phone.constants.phonePrefixs).toContain(prefix);
    }
  });

  describe("format argument", () => {
    it("format = '#### ## ##'. should replace each '#' with a digit and keep spaces", () => {
      for (let i = 0; i < 100; i++) {
        const value = modules.phone.number({ format: "#### ## ##" });

        expect(value).toHaveLength("#### ## ##".length);
        expect(value).toMatch(/^\d{4} \d{2} \d{2}$/);
      }
    });

    it("format without '#'. format = 'hola'. should return the format as-is", () => {
      const value = modules.phone.number({ format: "hola" });

      expect(value).toBe("hola");
    });
  });
});
