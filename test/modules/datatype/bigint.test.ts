import { describe, expect, it } from "vitest";
import { ChacaError, modules } from "../../../src";

const VALUE_LIMIT = 1000;

describe("datatype.bigint", () => {
  it("no arguments. should return a bigint", () => {
    const value = modules.datatype.bigint();

    expect(typeof value).toBe("bigint");
  });

  describe("min argument", () => {
    it("min = 1000n. should return a number greater or equal than 1000n", () => {
      for (let index = 0; index < VALUE_LIMIT; index++) {
        const value = modules.datatype.bigint({ min: BigInt(1000) });

        expect(value).toBeGreaterThanOrEqual(BigInt(1000));
      }
    });
  });

  describe("max argument", () => {
    it("max = 1000n. should return a number less or equal than 1000n", () => {
      for (let index = 0; index < VALUE_LIMIT; index++) {
        const value = modules.datatype.bigint({ max: BigInt(1000) });

        expect(value).toBeLessThanOrEqual(BigInt(1000));
      }
    });
  });

  describe("min and max argument", () => {
    it("min = 10n & max = 100n. should return a bigint within the range", () => {
      for (let index = 0; index < VALUE_LIMIT; index++) {
        const value = modules.datatype.bigint({
          min: BigInt(10),
          max: BigInt(100),
        });

        expect(value).toBeGreaterThanOrEqual(BigInt(10));
        expect(value).toBeLessThanOrEqual(BigInt(100));
      }
    });

    it("min = 100n & max = 10n. should throw a ChacaError", () => {
      expect(() =>
        modules.datatype.bigint({ min: BigInt(100), max: BigInt(10) }),
      ).toThrow(ChacaError);
    });

    it("min = 50n & max = 50n. should return exactly 50n", () => {
      const value = modules.datatype.bigint({
        min: BigInt(50),
        max: BigInt(50),
      });

      expect(value).toBe(BigInt(50));
    });
  });
});
