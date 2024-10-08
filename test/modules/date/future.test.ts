import { modules } from "../../../src";
import { describe, expect, it } from "vitest";

const TEST_COUNT_VALUES = 1000;

describe("# Date future test", () => {
  it("Without arguments", () => {
    const allDates = Array.from({ length: TEST_COUNT_VALUES }).map((v) =>
      modules.date.future(),
    );

    expect(allDates.every((d) => d.getTime() > new Date().getTime())).toBe(
      true,
    );
  });

  it("Pass year=5", () => {
    const allDates = Array.from({ length: TEST_COUNT_VALUES }).map((v) =>
      modules.date.future({ years: 5 }),
    );

    expect(
      allDates.every((d) => d.getFullYear() - new Date().getFullYear() <= 5),
    ).toBe(true);
  });

  it("Pass years=-5", () => {
    const allDates = Array.from({ length: TEST_COUNT_VALUES }).map((v) =>
      modules.date.future({ years: -5 }),
    );

    expect(allDates.every((d) => d.getTime() > new Date().getTime())).toBe(
      true,
    );
  });
});
