import { modules } from "../../../src";

const TEST_COUNT_VALUES = 1000;

describe("# Datatype Number test", () => {
  it("Without arguments. Should return float numbers", () => {
    const allValues = Array.from({ length: TEST_COUNT_VALUES }).map((v) =>
      modules.datatype.number(),
    );

    expect(allValues.every((v) => Boolean(typeof v === "number"))).toBe(true);
  });

  it("With min argument", () => {
    const allValues = Array.from({ length: TEST_COUNT_VALUES }).map(() =>
      modules.datatype.number({ min: 5 }),
    );

    expect(allValues.every((v) => v >= 5)).toBe(true);
  });

  it("With max argument", () => {
    const allValues = Array.from({ length: TEST_COUNT_VALUES }).map((v) =>
      modules.datatype.number({ max: 20 }),
    );

    expect(allValues.every((v) => v <= 20)).toBe(true);
  });

  it("With min and max argument", () => {
    const allValues = Array.from({ length: TEST_COUNT_VALUES }).map(() =>
      modules.datatype.number({ max: 1000, min: -1000 }),
    );

    expect(allValues.every((v) => v <= 1000 && v >= -1000)).toBe(true);
  });

  it("With min=-1000, max=1000, precision=0. Should return a integer number between -1000 and 1000", () => {
    const allValues = Array.from({ length: TEST_COUNT_VALUES }).map(() =>
      modules.datatype.number({ max: 1000, min: -1000, precision: 0 }),
    );

    expect(
      allValues.every((v) => v <= 1000 && v >= -1000 && Number.isInteger(v)),
    ).toBe(true);
  });
});
