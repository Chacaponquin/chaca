import { chaca, modules } from "../../../src";
import { describe, expect, it } from "vitest";
import { WrongPossibleNullDefinitionError } from "../../../src/errors";

function countNulls(array: any[]): number {
  let count = 0;

  for (const dat of array) {
    if (dat.null === null) {
      count++;
    }
  }

  return count;
}

describe("# Possible null fields tests", () => {
  describe("Boolean value", () => {
    it("Pass possibleNull = true. Returns at least one null value", () => {
      const schema = chaca.schema({
        null: { type: () => modules.color.cmyk(), possibleNull: true },
      });

      const data = schema.array(50);

      expect(countNulls(data)).toBeGreaterThan(0);
    });

    it("Pass possibleNull = false. Returns always a null value", () => {
      const schema = chaca.schema({
        null: { type: () => modules.color.cmyk(), possibleNull: false },
      });

      const data = schema.array(50);

      expect(countNulls(data)).toBe(0);
    });
  });

  describe("Number value", () => {
    it("Pass possibleNull = 0. Always return a non-null value", () => {
      const schema = chaca.schema({
        null: { type: () => modules.color.cmyk(), possibleNull: 0 },
      });

      const data = schema.array(50);

      expect(countNulls(data)).toBe(0);
    });

    it("Pass possibleNull = 1. Always return only one document with null value", () => {
      const schema = chaca.schema({
        null: { type: () => modules.color.cmyk(), possibleNull: 1 },
      });

      const data = schema.array(50);

      expect(countNulls(data)).toBe(1);
    });

    it("Pass possibleNull = number-greater-than-1. Should throw an error", () => {
      const schema = chaca.schema({
        null: { type: () => modules.color.cmyk(), possibleNull: 1.5 },
      });

      expect(() => schema.array(50)).toThrow(WrongPossibleNullDefinitionError);
    });

    it("Pass a number between 0 and 1. Should return at least one null value", () => {
      const schema = chaca.schema({
        null: { type: () => modules.color.cmyk(), possibleNull: 0.6 },
      });

      const data = schema.array(50);

      expect(countNulls(data)).toBeGreaterThan(0);
    });

    it("Pass possibleNull = negative-number. Should throw an error", () => {
      const schema = chaca.schema({
        null: { type: () => modules.color.cmyk(), possibleNull: -0.6 },
      });

      expect(() => schema.array(50)).toThrow(WrongPossibleNullDefinitionError);
    });
  });

  describe("Function value", () => {
    it("Pass a function that return a 0. Should return an non-null values", () => {
      const schema = chaca.schema({
        null: { type: () => modules.color.cmyk(), possibleNull: () => 0 },
      });

      const data = schema.array(50);

      expect(countNulls(data)).toBe(0);
    });

    it("Pass a function that return 1. Always return a null value", () => {
      const schema = chaca.schema({
        null: { type: () => modules.color.cmyk(), possibleNull: () => 1 },
      });

      const data = schema.array(50);

      expect(countNulls(data)).toBe(50);
    });

    it("Pass a function that return a number-greater-than-1. Should throw an error", () => {
      const schema = chaca.schema({
        null: { type: () => modules.color.cmyk(), possibleNull: () => 1.5 },
      });

      expect(() => schema.array(50)).toThrow(WrongPossibleNullDefinitionError);
    });

    it("Pass a function that return a number between 0 and 1. Should return at least one null value", () => {
      const schema = chaca.schema({
        null: { type: () => modules.color.cmyk(), possibleNull: () => 0.6 },
      });

      const data = schema.array(50);

      expect(countNulls(data)).toBeGreaterThan(0);
    });

    it("Pass a function that return a negative number. Should throw an error", () => {
      const schema = chaca.schema({
        null: { type: () => modules.color.cmyk(), possibleNull: () => -60 },
      });

      expect(() => schema.array(50)).toThrow(WrongPossibleNullDefinitionError);
    });

    it("Pass a function that uses currentFields", () => {
      const schema = chaca.schema({
        age: () => modules.datatype.int({ max: 90, min: 18 }),
        null: {
          type: () => modules.color.cmyk(),
          possibleNull: ({ currentFields }) => {
            if (currentFields.age > 40) {
              return 1;
            } else {
              return 0;
            }
          },
        },
      });

      const data = schema.array(50);

      let count = 0;
      data.forEach((d) => {
        if (d.age > 40) {
          count++;
        }
      });

      expect(countNulls(data)).toBe(count);
    });
  });
});
