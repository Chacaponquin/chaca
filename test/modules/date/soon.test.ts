import { describe, expect, it } from "vitest";
import { modules } from "../../../src";

const ITERATIONS = 500;

describe("date.soon", () => {
  it("no arguments. should return a date in the future", () => {
    for (let i = 0; i < ITERATIONS; i++) {
      const before = new Date();
      const value = modules.date.soon();

      expect(value).toBeInstanceOf(Date);
      expect(value.getTime()).toBeGreaterThanOrEqual(before.getTime());
    }
  });

  it("days = 5 & fixed refDate. should return a date within (refDate, refDate + 5 days]", () => {
    const refDate = new Date("2020-06-01T00:00:00.000Z");
    const maxTime = refDate.getTime() + 5 * 24 * 3600 * 1000;

    for (let i = 0; i < ITERATIONS; i++) {
      const value = modules.date.soon({ days: 5, refDate });

      expect(value.getTime()).toBeGreaterThan(refDate.getTime());
      expect(value.getTime()).toBeLessThanOrEqual(maxTime);
    }
  });

  it("refDate as string. should return a date within (refDate, refDate + 5 days]", () => {
    const refString = "2020-06-01T00:00:00.000Z";
    const refTime = new Date(refString).getTime();
    const maxTime = refTime + 5 * 24 * 3600 * 1000;

    for (let i = 0; i < ITERATIONS; i++) {
      const value = modules.date.soon({ days: 5, refDate: refString });

      expect(value.getTime()).toBeGreaterThan(refTime);
      expect(value.getTime()).toBeLessThanOrEqual(maxTime);
    }
  });

  it("should not mutate the passed refDate object", () => {
    const refDate = new Date("2020-06-01T00:00:00.000Z");
    const timeBefore = refDate.getTime();

    modules.date.soon({ days: 5, refDate });

    expect(refDate.getTime()).toBe(timeBefore);
  });
});
