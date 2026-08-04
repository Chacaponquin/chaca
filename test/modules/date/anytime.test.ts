import { describe, expect, it } from "vitest";
import { modules } from "../../../src";

const ITERATIONS = 500;

const YEAR_MS = 365 * 24 * 3600 * 1000;

describe("date.anytime", () => {
  it("no arguments. should return a valid Date", () => {
    for (let i = 0; i < ITERATIONS; i++) {
      const value = modules.date.anytime();

      expect(value).toBeInstanceOf(Date);
      expect(isNaN(value.getTime())).toBe(false);
    }
  });

  it("fixed refDate. should return a date within refDate +/- 365 days", () => {
    const refDate = new Date("2020-06-01T00:00:00.000Z");
    const min = refDate.getTime() - YEAR_MS;
    const max = refDate.getTime() + YEAR_MS;

    for (let i = 0; i < ITERATIONS; i++) {
      const value = modules.date.anytime({ refDate });

      expect(value.getTime()).toBeGreaterThanOrEqual(min);
      expect(value.getTime()).toBeLessThanOrEqual(max);
    }
  });
});
