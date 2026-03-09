import { modules } from "../../../src";
import { describe, expect, it } from "vitest";

describe("date.birthdate", () => {
  describe("mode 'year'", () => {
    it("min: 1959, max: 2005 should return a date between those years", () => {
      const allDates = Array.from({ length: 100 }).map(() =>
        modules.date.birthdate({ min: 1959, max: 2005, mode: "year" }),
      );

      expect(
        allDates.every(
          (d) =>
            d.getUTCFullYear() >= 1959 && d.getUTCFullYear() <= 2005,
        ),
      ).toBe(true);
    });

    it("no min/max should not throw an error", () => {
      expect(() => {
        modules.date.birthdate({ mode: "year" });
      }).not.toThrow();
    });

    it("no min/max should return a valid date", () => {
      const allDates = Array.from({ length: 100 }).map(() =>
        modules.date.birthdate({ mode: "year" }),
      );

      expect(allDates.every((d) => d instanceof Date && !isNaN(d.getTime()))).toBe(
        true,
      );
    });
  });

  describe("mode 'age'", () => {
    it("min: 18, max: 65 should return a date within that age range", () => {
      const allDates = Array.from({ length: 100 }).map(() =>
        modules.date.birthdate({ min: 18, max: 65, mode: "age" }),
      );

      const now = new Date();
      expect(
        allDates.every((d) => {
          const age = now.getUTCFullYear() - d.getUTCFullYear();
          return age >= 17 && age <= 66;
        }),
      ).toBe(true);
    });

    it("no arguments should not throw", () => {
      expect(() => {
        modules.date.birthdate();
      }).not.toThrow();
    });
  });
});
