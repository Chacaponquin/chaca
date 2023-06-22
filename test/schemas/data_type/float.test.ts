import { chaca, schemas } from "../../../src";

const TEST_COUNT_VALUES = 1000;

describe("# Float Datatype test", () => {
  it("Without arguments. Should return float numbers", () => {
    const allValues = Array.from({ length: TEST_COUNT_VALUES }).map((v) =>
      schemas.dataType.float().getValue(),
    );

    expect(allValues.every((v) => Boolean(v))).toBe(true);
  });

  it("With min argument", () => {
    const allValues = Array.from({ length: TEST_COUNT_VALUES }).map(() =>
      schemas.dataType.float().getValue({ min: 5 }),
    );

    expect(allValues.every((v) => v >= 5)).toBe(true);
  });

  it("With max argument", () => {
    const allValues = Array.from({ length: TEST_COUNT_VALUES }).map((v) =>
      schemas.dataType.float().getValue({ max: 20 }),
    );

    expect(allValues.every((v) => v <= 20)).toBe(true);
  });

  it("With min and max argument", () => {
    const allValues = Array.from({ length: TEST_COUNT_VALUES }).map(() =>
      schemas.dataType.float().getValue({ max: 1000, min: -1000 }),
    );

    expect(allValues.every((v) => v <= 1000 && v >= -1000)).toBe(true);
  });

  it("With precision argument", () => {
    const allValues = Array.from({ length: TEST_COUNT_VALUES }).map(() =>
      schemas.dataType.float().getValue({ precision: 5 }),
    );

    expect(allValues.every((v) => !Number.isInteger(v))).toBe(true);
  });

  it("With precision, max and min argumnets", () => {
    const allValues = Array.from({ length: TEST_COUNT_VALUES }).map(() =>
      schemas.dataType
        .float()
        .getValue({ precision: 5, max: 1000, min: -1000 }),
    );

    expect(
      allValues.every((v) => !Number.isInteger(v) && v >= -1000 && v <= 1000),
    ).toBe(true);
  });
});
