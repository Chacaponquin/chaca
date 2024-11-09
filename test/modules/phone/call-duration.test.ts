import { modules } from "../../../src";
import { describe, expect, it } from "vitest";

const validateTime = (
  text: string,
  { min, max }: { min: number; max: number },
): boolean => {
  const firstNumber = Number(text.slice(0, 2));

  if (firstNumber > max) return false;
  else if (firstNumber < min) return false;
  return true;
};

describe("phone.callDuration", () => {
  it(`no arguments. should return a string with two numbers between 0 and 59`, () => {
    const value = modules.phone.callDuration();
    expect(typeof value === "string" && value.length === 5).toBe(true);
    expect(validateTime(value, { min: 0, max: 59 })).toBe(true);
  });

  describe("max argument", () => {
    it("max = 59. should return a string with two numbers between 0 and 59", () => {
      const value = modules.phone.callDuration({ max: 90 });
      expect(value).toHaveLength(5);
      expect(validateTime(value, { min: 0, max: 59 })).toBe(true);
    });

    it("passing inferior than 0. max = -20. should return a string with two numbers between 0 and 59", () => {
      const value = modules.phone.callDuration({ max: -20 });
      expect(value).toHaveLength(5);
      expect(validateTime(value, { min: 0, max: 59 })).toBe(true);
    });

    it("max = 30. should return a string with two numbers, the first one must be inferior than the argument", () => {
      const value = modules.phone.callDuration({ max: 30 });
      expect(value).toHaveLength(5);
      expect(validateTime(value, { min: 0, max: 30 })).toBe(true);
    });
  });

  describe("min argument", () => {
    it("min = -10. should return a string with two numbers between 0 and 59", () => {
      const value = modules.phone.callDuration({ min: -10 });
      expect(value).toHaveLength(5);
      expect(validateTime(value, { min: 0, max: 59 })).toBe(true);
    });

    it("min = 20. should return a string with two numbers, the first one must be a value between the min argument and 59", () => {
      const value = modules.phone.callDuration({ min: 20 });
      expect(value).toHaveLength(5);
      expect(validateTime(value, { min: 20, max: 59 })).toBe(true);
    });

    it("min = 100. should return a string with two numbers, the first one must be a value 0 and 59", () => {
      const value = modules.phone.callDuration({ min: 100 });
      expect(value).toHaveLength(5);
      expect(validateTime(value, { min: 0, max: 59 })).toBe(true);
    });
  });

  describe("min and max arguments", () => {
    it("max = 40 & min = 20. should return a string with two numbers between 0 and 59, the first one between 20 and 40", () => {
      const value = modules.phone.callDuration({ min: 20, max: 40 });
      expect(value).toHaveLength(5);
      expect(validateTime(value, { min: 20, max: 40 })).toBe(true);
    });

    it("min = 20 & max: 10. should return a string with two numbers between 0 and 59, the first one between the min argument and 59", () => {
      const value = modules.phone.callDuration({ min: 20, max: 10 });
      expect(value).toHaveLength(5);
      expect(validateTime(value, { min: 20, max: 59 })).toBe(true);
    });

    it("max = 20 & min = 20. should return a string with two numbers between 0 and 59, the first one equal to value pass", () => {
      const value = modules.phone.callDuration({ min: 20, max: 20 });
      expect(value).toHaveLength(5);
      expect(validateTime(value, { min: 20, max: 20 })).toBe(true);
    });

    it("min = -20 & max = 80. should return a string with two numbers between 0 and 59", () => {
      const value = modules.phone.callDuration({ min: -20, max: 80 });
      expect(value).toHaveLength(5);
      expect(validateTime(value, { min: 0, max: 59 })).toBe(true);
    });
  });
});
