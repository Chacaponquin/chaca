import { ChacaError, modules } from "../../../src";
import { describe, expect, it } from "vitest";

const VALUES_LIMIT = 5000;

describe("datatype.float", () => {
  it("no arguments. should return a float number", () => {
    const allValues = Array.from({ length: VALUES_LIMIT }).map(() =>
      modules.datatype.float(),
    );

    expect(allValues.every((v) => typeof v === "number")).toBe(true);
  });

  describe("min argument", () => {
    it("min = 5. should return a number greater than 5", () => {
      const allValues = Array.from({ length: VALUES_LIMIT }).map(() =>
        modules.datatype.float({ min: 5 }),
      );

      expect(allValues.every((v) => v >= 5)).toBe(true);
    });
  });

  describe("max argument", () => {
    it("max = 20. should return a number less than 20", () => {
      const allValues = Array.from({ length: VALUES_LIMIT }).map(() =>
        modules.datatype.float({ max: 20 }),
      );

      expect(allValues.every((v) => v <= 20)).toBe(true);
    });
  });

  describe("min and max argument", () => {
    it("min = -1000 & max = 1000. should return a number between -1000 and 1000", () => {
      for (let index = 0; index < VALUES_LIMIT; index++) {
        const value = modules.datatype.float({
          max: 1000,
          min: -1000,
        });

        expect(value).toBeGreaterThanOrEqual(-1000);
        expect(value).toBeLessThanOrEqual(1000);
      }
    });

    it("min = 1000 & max = -1000. should throw an error", () => {
      expect(() => {
        modules.datatype.float({ max: -1000, min: 1000 });
      }).toThrow(ChacaError);
    });
  });

  describe("precision argument", () => {
    it("precision = 10. should return a number 5 numbers after the break point", () => {
      for (let index = 0; index < VALUES_LIMIT; index++) {
        const value = modules.datatype.float({
          precision: 10,
        });

        expect(Number.isInteger(value)).toBe(false);

        const str = String(value);
        const float = str.split(".")[1];

        expect(float.length >= 1).toBe(true);
      }
    });
  });

  describe("precision, min and max arguments", () => {
    it("precision = 10 & min = -1000 & max = 1000. Should return a number between -1000 and 1000 with 5 numbers after the break point", () => {
      for (let index = 0; index < VALUES_LIMIT; index++) {
        const value = modules.datatype.float({
          precision: 10,
          max: 1000,
          min: -1000,
        });

        expect(Number.isInteger(value)).toBe(false);
        expect(value).toBeGreaterThanOrEqual(-1000);
        expect(value).toBeLessThanOrEqual(1000);
      }
    });
  });
});
