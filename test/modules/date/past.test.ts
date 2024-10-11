import { modules } from "../../../src";
import { describe, expect, it } from "vitest";

const TEST_COUNT_VALUES = 1000;

describe("# Date past test", () => {
  it("Without arguments", () => {
    const allDates = Array.from({ length: TEST_COUNT_VALUES }).map((v) =>
      modules.date.past(),
    );

    expect(allDates.every((d) => d.getTime() < new Date().getTime())).toBe(
      true,
    );
  });

  it("Pass year=5", () => {
    const allDates = Array.from({ length: TEST_COUNT_VALUES }).map(() =>
      modules.date.past({ years: 5 }),
    );

    expect(
      allDates.every((d) => new Date().getFullYear() - d.getFullYear() <= 5),
    ).toBe(true);
  });

  it("Pass years=-5", () => {
    const allDates = Array.from({ length: TEST_COUNT_VALUES }).map((v) =>
      modules.date.past({ years: -5 }),
    );

    expect(allDates.every((d) => d.getTime() < new Date().getTime())).toBe(
      true,
    );
  });
});