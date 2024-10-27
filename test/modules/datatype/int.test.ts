import { ChacaError, modules } from "../../../src";
import { describe, expect, it } from "vitest";

describe("datatype.int", () => {
  const VALUES_LIMIT = 1000;

  describe("max and min argument", () => {
    it("max = 20 & min = 20. should return 20", () => {
      for (let i = 0; i < VALUES_LIMIT; i++) {
        const value = modules.datatype.int({ max: 20, min: 20 });

        expect(value).toBe(20);
      }
    });

    it("min = 0 & max = 0. should return 0", () => {
      for (let i = 0; i < VALUES_LIMIT; i++) {
        const value = modules.datatype.int({ max: 0, min: 0 });

        expect(value).toBe(0);
      }
    });

    it("max = -1 & min = -10. should return an integer number between -1 and -10", () => {
      for (let i = 0; i < VALUES_LIMIT; i++) {
        const value = modules.datatype.int({ max: -1, min: -10 });

        expect(value).toBeGreaterThanOrEqual(-10);
        expect(value).toBeLessThanOrEqual(-1);
        expect(Number.isInteger(value)).toBe(true);
      }
    });

    it("min = 5 & max = 0. should throw an error", () => {
      expect(() => modules.datatype.int({ min: 5, max: 0 })).toThrow(
        ChacaError,
      );
    });

    it("max = 100 & min = 0. should return an integer number between 0 and 100", () => {
      for (let i = 0; i < VALUES_LIMIT; i++) {
        const value = modules.datatype.int({ max: 100, min: 0 });

        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThanOrEqual(100);
        expect(Number.isInteger(value)).toBe(true);
      }
    });

    it("min = 0 & max = 8. should return a number between 0 and 8", () => {
      for (let i = 0; i < VALUES_LIMIT; i++) {
        const value = modules.datatype.int({ max: 8, min: 0 });

        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThanOrEqual(8);
        expect(Number.isInteger(value)).toBe(true);
      }
    });
  });

  describe("max argument", () => {
    it("max = 5. should return a int number less than 5", () => {
      for (let i = 0; i < VALUES_LIMIT; i++) {
        const value = modules.datatype.int({ max: 5 });

        expect(value).toBeLessThanOrEqual(5);
        expect(Number.isInteger(value)).toBe(true);
      }
    });
  });

  describe("min argument", () => {
    it("min = -50. should return an int grater than -50", () => {
      for (let i = 0; i < VALUES_LIMIT; i++) {
        const value = modules.datatype.int({ min: -50 });

        expect(value).toBeGreaterThanOrEqual(-50);
        expect(Number.isInteger(value)).toBe(true);
      }
    });
  });
});
