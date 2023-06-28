import { schemas } from "../../../src";

const TEST_COUNT_VALUES = 1000;

describe("# Date future test", () => {
  it("Without arguments", () => {
    const allDates = Array.from({ length: TEST_COUNT_VALUES }).map((v) =>
      schemas.date.future().getValue(),
    );

    expect(allDates.every((d) => d.getTime() > new Date().getTime())).toBe(
      true,
    );
  });

  it("Pass year=5", () => {
    const allDates = Array.from({ length: TEST_COUNT_VALUES }).map((v) =>
      schemas.date.future().getValue({ years: 5 }),
    );

    expect(
      allDates.every((d) => d.getFullYear() - new Date().getFullYear() <= 5),
    ).toBe(true);
  });

  it("Pass years=-5", () => {
    const allDates = Array.from({ length: TEST_COUNT_VALUES }).map((v) =>
      schemas.date.future().getValue({ years: -5 }),
    );

    expect(allDates.every((d) => d.getTime() > new Date().getTime())).toBe(
      true,
    );
  });
});
