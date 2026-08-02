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

  describe("refDate argument", () => {
    it("years = 2 & fixed refDate. should return a date strictly before refDate and within 2 years. should not mutate refDate", () => {
      const refDate = new Date("2020-06-01T00:00:00.000Z");
      const timeBefore = refDate.getTime();
      const minTime = refDate.getTime() - 2 * 365 * 24 * 3600 * 1000;

      for (let i = 0; i < TEST_COUNT_VALUES; i++) {
        const value = modules.date.past({ years: 2, refDate });

        expect(value.getTime()).toBeLessThan(refDate.getTime());
        expect(value.getTime()).toBeGreaterThanOrEqual(minTime);
      }

      expect(refDate.getTime()).toBe(timeBefore);
    });
  });
});
