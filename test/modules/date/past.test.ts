import { modules } from "../../../src";
import { describe, expect, it } from "vitest";

const TEST_COUNT_VALUES = 1000;

describe("date.past", () => {
  it("no aeguments. should return a past date", () => {
    const allDates = Array.from({ length: TEST_COUNT_VALUES }).map(() =>
      modules.date.past(),
    );

    expect(allDates.every((d) => d.getTime() <= new Date().getTime())).toBe(
      true,
    );
  });

  describe("year argument", () => {
    it("year = 5. should return an at most 5 years past", () => {
      const allDates = Array.from({ length: TEST_COUNT_VALUES }).map(() =>
        modules.date.past({ years: 5 }),
      );

      expect(
        allDates.every((d) => new Date().getFullYear() - d.getFullYear() <= 5),
      ).toBe(true);
    });

    it("years = -5. should return a past date", () => {
      const allDates = Array.from({ length: TEST_COUNT_VALUES }).map(() =>
        modules.date.past({ years: -5 }),
      );

      expect(allDates.every((d) => d.getTime() < new Date().getTime())).toBe(
        true,
      );
    });
  });
});
