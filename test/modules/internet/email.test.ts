import { modules } from "../../../src";
import { describe, expect, it } from "vitest";

describe("internet.email", () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  it("no arguments. should return an email", () => {
    const value = modules.internet.email();

    expect(emailRegex.test(value)).toBe(true);
  });

  it("should return a fully lowercased email", () => {
    const value = modules.internet.email({
      firstName: "Pedro",
      lastName: "Scott",
    });

    expect(value).toBe(value.toLowerCase());
  });

  describe("provider argument", () => {
    it("provider = 'yahoo.com'. should end with '@yahoo.com' without appending an extra '.com'", () => {
      const value = modules.internet.email({ provider: "yahoo.com" });

      expect(value.endsWith("@yahoo.com")).toBe(true);
      expect(value.endsWith("@yahoo.com.com")).toBe(false);
    });

    it("provider = 'outlook'. should append '.com' and end with '@outlook.com'", () => {
      const value = modules.internet.email({ provider: "outlook" });

      expect(value.endsWith("@outlook.com")).toBe(true);
    });
  });

  describe("firstName and lastName arguments", () => {
    it("firstName = 'Pedro' & lastName = 'Scott'. local part should contain 'pedro' and 'scott' lowercased", () => {
      for (let i = 0; i < 50; i++) {
        const value = modules.internet.email({
          firstName: "Pedro",
          lastName: "Scott",
        });

        const localPart = value.split("@")[0];

        expect(localPart).toContain("pedro");
        expect(localPart).toContain("scott");
        expect(emailRegex.test(value)).toBe(true);
      }
    });
  });
});
