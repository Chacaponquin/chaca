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

describe("# Phone callDuration test", () => {
  describe("without arguments", () => {
    const value = modules.phone.callDuration();

    it(`Should return a string with two numbers between 0 and 59 VALUE=${value}`, () => {
      expect(typeof value === "string" && value.length === 5).toBe(true);
      expect(validateTime(value, { min: 0, max: 59 })).toBe(true);
    });
  });

  describe("Passing only max argument", () => {
    describe("passing superior than 59", () => {
      const value = modules.phone.callDuration({ max: 90 });
      it(`should return a string with two numbers between 0 and 59 VALUE=${value}`, () => {
        expect(typeof value === "string" && value.length === 5).toBe(true);
        expect(validateTime(value, { min: 0, max: 59 })).toBe(true);
      });
    });

    describe("passing inferior than 0", () => {
      const value = modules.phone.callDuration({ max: -20 });
      it(`should return a string with two numbers between 0 and 59 VALUE=${value}`, () => {
        expect(typeof value === "string" && value.length === 5).toBe(true);
        expect(validateTime(value, { min: 0, max: 59 })).toBe(true);
      });
    });

    describe("passing a max argument between 0 and 59", () => {
      const value = modules.phone.callDuration({ max: 30 });
      it(`should return a string with two numbers, the first one must be inferior than the argument VALUE=${value}`, () => {
        expect(typeof value === "string" && value.length === 5).toBe(true);
        expect(validateTime(value, { min: 0, max: 30 })).toBe(true);
      });
    });
  });

  describe("passing only min argument", () => {
    describe("passing inferior than 0", () => {
      const value = modules.phone.callDuration({ min: -10 });
      it(`should return a string with two numbers between 0 and 59`, () => {
        expect(typeof value === "string" && value.length === 5).toBe(true);
        expect(validateTime(value, { min: 0, max: 59 })).toBe(true);
      });
    });

    describe("passing a value between 0 and 59", () => {
      const value = modules.phone.callDuration({ min: 20 });
      it(`should return a string with two numbers, the first one must be a value between the min argument and 59`, () => {
        expect(typeof value === "string" && value.length === 5).toBe(true);
        expect(validateTime(value, { min: 20, max: 59 })).toBe(true);
      });
    });

    describe("passing a value superior than 59", () => {
      const value = modules.phone.callDuration({ min: 100 });
      it(`should return a string with two numbers, the first one must be a value 0 and 59`, () => {
        expect(typeof value === "string" && value.length === 5).toBe(true);
        expect(validateTime(value, { min: 0, max: 59 })).toBe(true);
      });
    });
  });

  describe("passing bouth arguments (min and max)", () => {
    describe("max value superior than min", () => {
      const value = modules.phone.callDuration({ min: 20, max: 40 });
      it(`should return a string with two numbers between 0 and 59, the first one between 20 and 40`, () => {
        expect(typeof value === "string" && value.length === 5).toBe(true);
        expect(validateTime(value, { min: 20, max: 40 })).toBe(true);
      });
    });

    describe("max value inferior than min", () => {
      const value = modules.phone.callDuration({ min: 20, max: 10 });
      it(`should return a string with two numbers between 0 and 59, the first one between the min argument and 59`, () => {
        expect(typeof value === "string" && value.length === 5).toBe(true);
        expect(validateTime(value, { min: 20, max: 59 })).toBe(true);
      });
    });

    describe("bouth argument equals", () => {
      const value = modules.phone.callDuration({ min: 20, max: 20 });
      it(`should return a string with two numbers between 0 and 59, the first one equal to value pass`, () => {
        expect(typeof value === "string" && value.length === 5).toBe(true);
        expect(validateTime(value, { min: 20, max: 20 })).toBe(true);
      });
    });

    describe("bouth argument out of range", () => {
      const value = modules.phone.callDuration({ min: -20, max: 80 });
      it(`should return a string with two numbers between 0 and 59`, () => {
        expect(typeof value === "string" && value.length === 5);
        expect(validateTime(value, { min: 0, max: 59 })).toBe(true);
      });
    });
  });
});
