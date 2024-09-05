import { modules } from "../../../src";

const TEST_COUNT_VALUES = 1000;

describe("# Datatype Float test", () => {
  it("Without arguments. Should return float numbers", () => {
    const allValues = Array.from({ length: TEST_COUNT_VALUES }).map((v) =>
      modules.datatype.float(),
    );

    expect(allValues.every((v) => Boolean(typeof v === "number"))).toBe(true);
  });

  it("With min argument", () => {
    const allValues = Array.from({ length: TEST_COUNT_VALUES }).map(() =>
      modules.datatype.float({ min: 5 }),
    );

    expect(allValues.every((v) => v >= 5)).toBe(true);
  });

  it("With max argument", () => {
    const allValues = Array.from({ length: TEST_COUNT_VALUES }).map((v) =>
      modules.datatype.float({ max: 20 }),
    );

    expect(allValues.every((v) => v <= 20)).toBe(true);
  });

  it("With min and max argument", () => {
    const allValues = Array.from({ length: TEST_COUNT_VALUES }).map(() =>
      modules.datatype.float({ max: 1000, min: -1000 }),
    );

    expect(allValues.every((v) => v <= 1000 && v >= -1000)).toBe(true);
  });

  it("With precision argument", () => {
    const allValues = Array.from({ length: TEST_COUNT_VALUES }).map(() =>
      modules.datatype.float({ precision: 5 }),
    );

    expect(allValues.every((v) => !Number.isInteger(v))).toBe(true);
  });

  it("With precision, max and min argumnets", () => {
    const allValues = Array.from({ length: TEST_COUNT_VALUES }).map(() =>
      modules.datatype.float({ precision: 5, max: 1000, min: -1000 }),
    );

    expect(
      allValues.every((v) => !Number.isInteger(v) && v >= -1000 && v <= 1000),
    ).toBe(true);
  });
});
