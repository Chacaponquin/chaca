import { describe, expect, it } from "vitest";
import { modules } from "../../../src";

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
});
