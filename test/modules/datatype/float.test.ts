import { ChacaError, modules } from "../../../src";
import { describe, expect, it } from "vitest";

const TEST_COUNT_VALUES = 5000;

describe("datatype.float", () => {
  it("no arguments. should return a float number", () => {
    const allValues = Array.from({ length: TEST_COUNT_VALUES }).map(() =>
      modules.datatype.float(),
    );

    expect(allValues.every((v) => typeof v === "number")).toBe(true);
  });

  describe("min argument", () => {
    it("min = 5. should return a number greater than 5", () => {
      const allValues = Array.from({ length: TEST_COUNT_VALUES }).map(() =>
        modules.datatype.float({ min: 5 }),
      );

      expect(allValues.every((v) => v >= 5)).toBe(true);
    });
  });

  describe("max argument", () => {
    it("max = 20. should return a number less than 20", () => {
      const allValues = Array.from({ length: TEST_COUNT_VALUES }).map(() =>
        modules.datatype.float({ max: 20 }),
      );

      expect(allValues.every((v) => v <= 20)).toBe(true);
    });
  });

  describe("min and max argument", () => {
    it("min = -1000 & max = 1000. should return a number between -1000 and 1000", () => {
      const allValues = Array.from({ length: TEST_COUNT_VALUES }).map(() =>
        modules.datatype.float({ max: 1000, min: -1000 }),
      );

      expect(allValues.every((v) => v <= 1000 && v >= -1000)).toBe(true);
    });

    it("min = 1000 & max = -1000. should throw an error", () => {
      expect(() => {
        modules.datatype.float({ max: -1000, min: 1000 });
      }).toThrow(ChacaError);
    });
  });

  describe("precision argument", () => {
    it("precision = 5. should return a number 5 numbers after the break point", () => {
      const allValues = Array.from({ length: TEST_COUNT_VALUES }).map(() =>
        modules.datatype.float({ precision: 5 }),
      );

      expect(allValues.every((v) => !Number.isInteger(v))).toBe(true);
      expect(
        allValues.every((v) => {
          const str = String(v);
          const float = str.split(".")[1];

          return float.length >= 1;
        }),
      ).toBe(true);
    });
  });

  describe("precision, min and max arguments", () => {
    it("precision = 5 & min = -1000 & max = 1000. Should return a number between -1000 and 1000 with 5 numbers after the break point", () => {
      const allValues = Array.from({ length: TEST_COUNT_VALUES }).map(() =>
        modules.datatype.float({ precision: 5, max: 1000, min: -1000 }),
      );

      expect(
        allValues.every((v) => !Number.isInteger(v) && v >= -1000 && v <= 1000),
      ).toBe(true);
    });
  });
});
