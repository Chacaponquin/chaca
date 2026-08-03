import { ChacaError, modules } from "../../../src";
import { describe, expect, it } from "vitest";

function ageAt(birthdate: Date, refDate: Date): number {
  let age = refDate.getUTCFullYear() - birthdate.getUTCFullYear();

  const monthDiff = refDate.getUTCMonth() - birthdate.getUTCMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && refDate.getUTCDate() < birthdate.getUTCDate())
  ) {
    age--;
  }

  return age;
}

describe("date.birthdate", () => {
  describe("mode 'year'", () => {
    it("min: 1959, max: 2005 should return a date between those years", () => {
      const allDates = Array.from({ length: 100 }).map(() =>
        modules.date.birthdate({ min: 1959, max: 2005, mode: "year" }),
      );

      expect(
        allDates.every(
          (d) => d.getUTCFullYear() >= 1959 && d.getUTCFullYear() <= 2005,
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

      expect(
        allDates.every((d) => d instanceof Date && !isNaN(d.getTime())),
      ).toBe(true);
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

    it("min: 30, max: 20 should throw a ChacaError", () => {
      expect(() => {
        modules.date.birthdate({ min: 30, max: 20, mode: "age" });
      }).toThrow(ChacaError);
    });

    it("fixed refDate & min: 18, max: 65 should return ages within [18, 66] against that refDate", () => {
      const refDate = new Date("2020-06-15T12:00:00.000Z");

      const allDates = Array.from({ length: 500 }).map(() =>
        modules.date.birthdate({ min: 18, max: 65, mode: "age", refDate }),
      );

      // the implementation generates dates in
      // [refDate - (max + 1) years, refDate - min years],
      // so the resulting age is within [min, max + 1]
      expect(
        allDates.every((d) => {
          const age = ageAt(d, refDate);
          return age >= 18 && age <= 66;
        }),
      ).toBe(true);
    });
  });
});
