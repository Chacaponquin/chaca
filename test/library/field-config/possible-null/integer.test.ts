import { describe, expect, it } from "vitest";
import { countNulls } from "./core/count-nulls";
import { chaca, modules } from "../../../../src";
import { WrongPossibleNullDefinitionError } from "../../../../src/errors";

describe("Possible null integer definition", () => {
  it("possibleNull = 0. always return a non-null value", async () => {
    const schema = chaca.schema({
      null: { type: () => modules.color.cmyk(), possibleNull: 0 },
    });

    const data = await schema.array(50);

    expect(countNulls(data)).toBe(0);
  });

  it("possibleNull = 1. return 1 document with 1 value", async () => {
    const schema = chaca.schema({
      null: { type: () => modules.color.cmyk(), possibleNull: 1 },
    });

    const data = await schema.array(50);

    expect(countNulls(data)).toBe(1);
  });

  it("possibleNull = 50 and generate 50 documents. should return 50 nulls", async () => {
    const schema = chaca.schema({
      null: { type: () => modules.color.cmyk(), possibleNull: 50 },
    });

    const data = await schema.array(50);

    expect(countNulls(data)).toBe(50);
  });

  it("possibleNull = -1. should throw an error", async () => {
    const schema = chaca.schema({
      null: { type: () => modules.color.cmyk(), possibleNull: -1 },
    });

    await expect(schema.array(50)).rejects.toThrow(
      WrongPossibleNullDefinitionError,
    );
  });

  it("possibleNull = 60 and generate 50 documents. should throw an error", async () => {
    const schema = chaca.schema({
      null: { type: () => modules.color.cmyk(), possibleNull: 60 },
    });

    await expect(schema.array(50)).rejects.toThrow(
      WrongPossibleNullDefinitionError,
    );
  });
});
