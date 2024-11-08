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

describe("Null fields", () => {
  describe("boolean definition", () => {
    it("true. always return null", () => {
      const schema = chaca.schema({
        null: { type: () => modules.color.cmyk(), possibleNull: true },
      });

      const data = schema.array(50);

      expect(countNulls(data)).toBe(50);
    });

    it("false. never return false", () => {
      const schema = chaca.schema({
        null: { type: () => modules.color.cmyk(), possibleNull: false },
      });

      const data = schema.array(50);

      expect(countNulls(data)).toBe(0);
    });
  });

  describe("float definition", () => {
    it("possibleNull = 1.5. should throw an error", () => {
      const schema = chaca.schema({
        null: { type: () => modules.color.cmyk(), possibleNull: 1.5 },
      });

      expect(() => schema.array(50)).toThrow(WrongPossibleNullDefinitionError);
    });

    it("possibleNull = 0.6. should return at least one null value", () => {
      const schema = chaca.schema({
        null: { type: () => modules.color.cmyk(), possibleNull: 0.6 },
      });

      const data = schema.array(50);

      expect(countNulls(data)).toBeGreaterThan(0);
    });

    it("possibleNull = -0.6. Should throw an error", () => {
      const schema = chaca.schema({
        null: { type: () => modules.color.cmyk(), possibleNull: -0.6 },
      });

      expect(() => schema.array(50)).toThrow(WrongPossibleNullDefinitionError);
    });
  });
});

describe("integer definition", () => {
  it("possibleNull = 0. always return a non-null value", () => {
    const schema = chaca.schema({
      null: { type: () => modules.color.cmyk(), possibleNull: 0 },
    });

    const data = schema.array(50);

    expect(countNulls(data)).toBe(0);
  });

  it("possibleNull = 1. return 1 document with 1 value", () => {
    const schema = chaca.schema({
      null: { type: () => modules.color.cmyk(), possibleNull: 1 },
    });

    const data = schema.array(50);

    expect(countNulls(data)).toBe(1);
  });

  describe("function definition", () => {
    it("function that return a 0. should return an non-null values", () => {
      const schema = chaca.schema({
        null: { type: () => modules.color.cmyk(), possibleNull: () => 0 },
      });

      const data = schema.array(50);

      expect(countNulls(data)).toBe(0);
    });

    it("function that return 1. always return a null value", () => {
      const schema = chaca.schema({
        null: { type: () => modules.color.cmyk(), possibleNull: () => 1 },
      });

      const data = schema.array(50);

      expect(countNulls(data)).toBe(50);
    });

    it("function that return a number-greater-than-1. should throw an error", () => {
      const schema = chaca.schema({
        null: { type: () => modules.color.cmyk(), possibleNull: () => 1.5 },
      });

      expect(() => schema.array(50)).toThrow(WrongPossibleNullDefinitionError);
    });

    it("function that return a number between 0 and 1. should return at least one null value", () => {
      const schema = chaca.schema({
        null: { type: () => modules.color.cmyk(), possibleNull: () => 0.6 },
      });

      const data = schema.array(50);

      expect(countNulls(data)).toBeGreaterThan(0);
    });

    it("function that return a negative number. should throw an error", () => {
      const schema = chaca.schema({
        null: { type: () => modules.color.cmyk(), possibleNull: () => -60 },
      });

      expect(() => schema.array(50)).toThrow(WrongPossibleNullDefinitionError);
    });

    it("function that return true. always return null", () => {
      const schema = chaca.schema({
        null: { type: () => modules.color.cmyk(), possibleNull: () => true },
      });

      const data = schema.array(50);

      expect(countNulls(data)).toBe(50);
    });

    it("function that returns undefined. should never return null", () => {
      const schema = chaca.schema({
        null: {
          type: () => modules.color.cmyk(),
          possibleNull: () => undefined,
        },
      });

      const data = schema.array(50);

      expect(countNulls(data)).toBe(0);
    });
  });
});
