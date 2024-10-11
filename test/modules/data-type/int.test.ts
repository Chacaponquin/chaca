import { modules } from "../../../src";
import { describe, expect, it } from "vitest";

describe("# Datatype Int Number test", () => {
  const ARRAY_LENGTH_TEXT = 1000;

  it("Passing a max value (5). Should return a int number less than 5", () => {
    const values = Array.from({ length: ARRAY_LENGTH_TEXT }).map(() =>
      modules.datatype.int({ max: 5 }),
    );

    expect(values.every((v) => v <= 5 && Number.isInteger(v))).toBe(true);
  });

  it("passing 20 as max and min argument. Sould return 20", () => {
    const values = Array.from({ length: ARRAY_LENGTH_TEXT }).map(() =>
      modules.datatype.int({ max: 20, min: 20 }),
    );

    expect(values.every((v) => v === 20 && Number.isInteger(v))).toBe(true);
  });

  it("Passing min: 0 && max: 100. Should return an int number between 0 and 100", () => {
    const values = Array.from({ length: ARRAY_LENGTH_TEXT }).map(() =>
      modules.datatype.int({ max: 100, min: 0 }),
    );

    expect(values.every((v) => v <= 100 && v >= 0 && Number.isInteger(v))).toBe(
      true,
    );
  });

  it("Passing min: -10 && max: -1. Should return an int number between -1 and -10", () => {
    const values = Array.from({ length: ARRAY_LENGTH_TEXT }).map(() =>
      modules.datatype.int({ max: -1, min: -10 }),
    );

    expect(
      values.every((v) => Number.isInteger(v) && v >= -10 && v <= -1),
    ).toBe(true);
  });

  it("Passing min: -50. Should return an int grater than -50", () => {
    const values = Array.from({ length: ARRAY_LENGTH_TEXT }).map(() =>
      modules.datatype.int({ min: -50 }),
    );

    expect(values.every((v) => Number.isInteger(v) && v >= -50)).toBe(true);
  });

  it("Pass min=0 & max=0. Should return 0", () => {
    const values = Array.from({ length: ARRAY_LENGTH_TEXT }).map(() =>
      modules.datatype.int({ min: 0, max: 0 }),
    );

    for (const v of values) {
      expect(Number.isInteger(v)).toBe(true);
      expect(v).toBe(0);
    }
  });
});