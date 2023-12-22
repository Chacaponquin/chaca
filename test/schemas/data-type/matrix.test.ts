import { schemas } from "../../../src";

const TEST_COUNT_VALUES = 1000;

describe("# Matrix Datatype test", () => {
  it("Without arguments", () => {
    const allValues = Array.from({ length: TEST_COUNT_VALUES }).map(() => {
      return schemas.dataType.matrix().getValue();
    });

    expect(
      allValues.every((m) => {
        return m.every((row) => row.every((v) => typeof v === "number"));
      }),
    );
  });

  it("With precision 0. Should return matrix with integer numbers", () => {
    const allValues = Array.from({ length: TEST_COUNT_VALUES }).map(() => {
      return schemas.dataType.matrix().getValue({ precision: 0 });
    });

    expect(
      allValues.every((m) => {
        return m.every((row) => row.every((v) => Number.isInteger(v)));
      }),
    );
  });

  it("With max argument", () => {
    const allValues = Array.from({ length: TEST_COUNT_VALUES }).map(() => {
      return schemas.dataType.matrix().getValue({ max: 5 });
    });

    expect(
      allValues.every((m) => {
        return m.every((row) => row.every((v) => v <= 5));
      }),
    );
  });

  it("With min, max and precision = 0 argument", () => {
    const allValues = Array.from({ length: TEST_COUNT_VALUES }).map(() => {
      return schemas.dataType
        .matrix()
        .getValue({ max: 5, min: -10, precision: 0 });
    });

    expect(
      allValues.every((m) => {
        return m.every((row) =>
          row.every((v) => v <= 5 && v >= -10 && Number.isInteger(v)),
        );
      }),
    );
  });

  it("Pass x_size=10 argument", () => {
    const allValues = Array.from({ length: TEST_COUNT_VALUES }).map(() => {
      return schemas.dataType.matrix().getValue({ x_size: 10 });
    });

    expect(allValues.every((m) => m.length === 10)).toBe(true);
  });

  it("Pass y_size=10 argument", () => {
    const allValues = Array.from({ length: TEST_COUNT_VALUES }).map(() => {
      return schemas.dataType.matrix().getValue({ y_size: 10 });
    });

    expect(allValues.every((m) => m.every((r) => r.length === 10))).toBe(true);
  });

  it("Pass y_size=10 and x_size=10 argument", () => {
    const allValues = Array.from({ length: TEST_COUNT_VALUES }).map(() => {
      return schemas.dataType.matrix().getValue({ x_size: 10, y_size: 10 });
    });

    expect(
      allValues.every(
        (m) => m.length === 10 && m.every((r) => r.length === 10),
      ),
    ).toBe(true);
  });

  it("Pass x_size=0 and y_size=0. Should return an empty matrix", () => {
    const allValues = Array.from({ length: TEST_COUNT_VALUES }).map(() => {
      return schemas.dataType.matrix().getValue({ x_size: 0, y_size: 0 });
    });

    expect(allValues.every((m) => m.length === 0)).toBe(true);
  });

  it("Pass x_size=-10", () => {
    const allValues = Array.from({ length: TEST_COUNT_VALUES }).map(() => {
      return schemas.dataType.matrix().getValue({ x_size: -10 });
    });

    expect(allValues.every((m) => m.length > 0)).toBe(true);
  });
});
