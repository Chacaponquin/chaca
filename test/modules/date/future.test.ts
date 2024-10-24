import { modules } from "../../../src";
import { describe, expect, it } from "vitest";

const TEST_COUNT_VALUES = 1000;

describe("date.future", () => {
  it("no arguments. should return a future date", () => {
    const allDates = Array.from({ length: TEST_COUNT_VALUES }).map(() =>
      modules.date.future(),
    );

    expect(allDates.every((d) => d.getTime() > new Date().getTime())).toBe(
      true,
    );
  });

  describe("year argument", () => {
    it("year = 5. should return an at most 5 years future date", () => {
      const allDates = Array.from({ length: TEST_COUNT_VALUES }).map(() =>
        modules.date.future({ years: 5 }),
      );

      expect(
        allDates.every((d) => d.getFullYear() - new Date().getFullYear() <= 5),
      ).toBe(true);
    });

    it("years = -5. should return a future date", () => {
      const allDates = Array.from({ length: TEST_COUNT_VALUES }).map(() =>
        modules.date.future({ years: -5 }),
      );

      expect(allDates.every((d) => d.getTime() > new Date().getTime())).toBe(
        true,
      );
    });
  });
});
