import { describe, expect, it } from "vitest";
import { countNulls } from "./core/count-nulls";
import { chaca, modules } from "../../../../src";
import { WrongPossibleNullDefinitionError } from "../../../../src/errors";
import { PromiseGeneratorValue } from "../../../shared/core/promise-value-generator";

describe("Possible null function definition", () => {
  it("function that return a 0. should return an non-null values", async () => {
    const schema = chaca.schema({
      null: { type: () => modules.color.cmyk(), possibleNull: () => 0 },
    });

    const data = await schema.array(50);

    expect(countNulls(data)).toBe(0);
  });

  it("function that return 1. always return a null value", async () => {
    const schema = chaca.schema({
      null: { type: () => modules.color.cmyk(), possibleNull: () => 1 },
    });

    const data = await schema.array(50);

    expect(countNulls(data)).toBe(50);
  });

  it("function that return a number-greater-than-1. should throw an error", () => {
    const schema = chaca.schema({
      null: { type: () => modules.color.cmyk(), possibleNull: () => 1.5 },
    });

    expect(() => schema.array(50)).rejects.toThrow(
      WrongPossibleNullDefinitionError,
    );
  });

  it("function that return a number between 0 and 1. should return at least one null value", async () => {
    const schema = chaca.schema({
      null: { type: () => modules.color.cmyk(), possibleNull: () => 0.6 },
    });

    const data = await schema.array(50);

    expect(countNulls(data)).toBeGreaterThan(0);
  });

  it("function that return a negative number. should throw an error", () => {
    const schema = chaca.schema({
      null: { type: () => modules.color.cmyk(), possibleNull: () => -60 },
    });

    expect(() => schema.array(50)).rejects.toThrow(
      WrongPossibleNullDefinitionError,
    );
  });

  it("function that return true. always return null", async () => {
    const schema = chaca.schema({
      null: { type: () => modules.color.cmyk(), possibleNull: () => true },
    });

    const data = await schema.array(50);

    expect(countNulls(data)).toBe(50);
  });

  it("function that returns undefined. should never return null", async () => {
    const schema = chaca.schema({
      null: {
        type: () => modules.color.cmyk(),
        possibleNull: () => undefined,
      },
    });

    const data = await schema.array(50);

    expect(countNulls(data)).toBe(0);
  });

  describe("async function", () => {
    it("async function that returns true. should return all nulls", async () => {
      const schema = chaca.schema({
        null: {
          type: () => modules.color.cmyk(),
          possibleNull: () => {
            return PromiseGeneratorValue.execute(true);
          },
        },
      });

      const data = await schema.array(50);

      expect(countNulls(data)).toBe(50);
    });

    it("async function that returns a negative number. should throw an error", () => {
      const schema = chaca.schema({
        null: {
          type: () => modules.color.cmyk(),
          possibleNull: () => {
            return PromiseGeneratorValue.execute(-1);
          },
        },
      });

      expect(async () => await schema.array(50)).rejects.toThrow(
        WrongPossibleNullDefinitionError,
      );
    });

    it("async function that returns a number between 0 and 1. should return at least 1 null value", async () => {
      const schema = chaca.schema({
        null: {
          type: () => modules.color.cmyk(),
          possibleNull: () => {
            return PromiseGeneratorValue.execute(0.7);
          },
        },
      });

      const data = await schema.array(100);

      expect(countNulls(data)).toBeGreaterThanOrEqual(1);
    });
  });
});
