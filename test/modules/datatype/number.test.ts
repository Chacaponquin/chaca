import { ChacaError, modules } from "../../../src";
import { describe, expect, it } from "vitest";

const VALUES_LIMIT = 1000;

describe("datatype.number", () => {
  it("no arguments. should return a integer or float number", () => {
    for (let index = 0; index < VALUES_LIMIT; index++) {
      const value = modules.datatype.number();

      expect(typeof value === "number").toBe(true);
    }
  });

  describe("min argument", () => {
    it("min = 5. should return a number greater than 5", () => {
      for (let index = 0; index < VALUES_LIMIT; index++) {
        const value = modules.datatype.number({ min: 5 });

        expect(value).toBeGreaterThanOrEqual(5);
      }
    });
  });

  describe("max argument", () => {
    it("max = 5. should return a number less than 5", () => {
      for (let index = 0; index < VALUES_LIMIT; index++) {
        const value = modules.datatype.number({ max: 5 });

        expect(value).toBeLessThanOrEqual(5);
      }
    });
  });

  describe("max and min argument", () => {
    it("max = 1000 & min = -1000. should return a number between -1000 and 1000", () => {
      for (let index = 0; index < VALUES_LIMIT; index++) {
        const value = modules.datatype.number({ max: 1000, min: -1000 });

        expect(value).toBeLessThanOrEqual(1000);
        expect(value).toBeGreaterThanOrEqual(-1000);
      }
    });

    it("max = 0 & min = 0. should return a 0", () => {
      for (let index = 0; index < VALUES_LIMIT; index++) {
        const value = modules.datatype.number({ max: 0, min: 0 });

        expect(Number.isInteger(value)).toBe(true);
        expect(value).toBe(0);
      }
    });

    it("min = 10 & max = 5. should throw an error", () => {
      expect(() => modules.datatype.number({ min: 10, max: 5 })).toThrow(
        ChacaError,
      );
    });
  });
});
