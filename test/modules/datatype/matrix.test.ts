import { ChacaError, modules } from "../../../src";
import { describe, expect, it } from "vitest";

const VALUES_LIMIT = 1000;

describe("datatype.matrix", () => {
  it("no arguments", () => {
    for (let index = 0; index < VALUES_LIMIT; index++) {
      const value = modules.datatype.matrix();

      expect(
        value.every((row) =>
          row.forEach((v) => expect(typeof v).toBe("number")),
        ),
      );
    }
  });

  describe("max argument", () => {
    it("max = 5. should return a matrix with all values less than 5", () => {
      for (let index = 0; index < VALUES_LIMIT; index++) {
        const value = modules.datatype.matrix({ max: 5 });

        expect(
          value.every((row) =>
            row.forEach((v) => {
              expect(typeof v).toBe("number");
              expect(v).toBeLessThanOrEqual(5);
            }),
          ),
        );
      }
    });
  });

  describe("precision argument", () => {
    it("precision = 0. should return matrix with integer numbers", () => {
      for (let index = 0; index < VALUES_LIMIT; index++) {
        const value = modules.datatype.matrix({ precision: 0 });

        expect(
          value.every((row) =>
            row.forEach((v) => expect(Number.isInteger(v)).toBe(true)),
          ),
        );
      }
    });
  });

  describe("max and min argument", () => {
    it("min = 5 & max = 0. should throw an error", () => {
      expect(() => modules.datatype.int({ max: 0, min: 5 })).toThrow(
        ChacaError,
      );
    });
  });

  describe("max, min and precision argument", () => {
    it("max = 5 & min = -10 & precision = 0. should return a matrix with all values between -10 and 5", () => {
      for (let index = 0; index < VALUES_LIMIT; index++) {
        const value = modules.datatype.matrix({
          precision: 0,
          max: 5,
          min: -10,
        });

        expect(
          value.every((row) =>
            row.forEach((v) => {
              expect(Number.isInteger(v)).toBe(true);
              expect(v).toBeGreaterThanOrEqual(-10);
              expect(v).toBeLessThanOrEqual(5);
            }),
          ),
        );
      }
    });
  });

  describe("x_size argument", () => {
    it("x_size = 10. should return an matrix with 10 rows", () => {
      const value = modules.datatype.matrix({
        x_size: 10,
      });

      expect(value).toHaveLength(10);
    });

    it("x_size = -10. should return an matrix with at least 1 row", () => {
      const value = modules.datatype.matrix({
        x_size: -10,
      });

      expect(value.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("y_size argument", () => {
    it("y_size = 10. should return an matrix with each row with 10 columns", () => {
      const value = modules.datatype.matrix({
        y_size: 10,
      });

      expect(value.every((r) => r.length === 10)).toBe(true);
    });

    it("y_size = -10. should return an matrix with all rown with at least 1 column", () => {
      const value = modules.datatype.matrix({
        y_size: -10,
      });

      expect(value.every((r) => r.length >= 1)).toBe(true);
    });
  });

  describe("x_size and y_size arguments", () => {
    it("x_size = 0 & y_size = 0. should return an empty matrix", () => {
      const value = modules.datatype.matrix({ x_size: 0, y_size: 0 });

      expect(value.length).toBe(0);
    });

    it("y_size = 10 & x_size = 10", () => {
      const value = modules.datatype.matrix({ x_size: 10, y_size: 10 });

      expect(value).toHaveLength(10);
      expect(value.every((r) => r.length === 10)).toBe(true);
    });
  });
});
