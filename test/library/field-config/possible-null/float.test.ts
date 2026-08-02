import { describe, expect, it } from "vitest";
import { chaca, modules } from "../../../../src";
import { WrongPossibleNullDefinitionError } from "../../../../src/errors";
import { countNulls } from "./core/count-nulls";

describe("Possible null float definition", () => {
  it("possibleNull = 1.5. should throw an error", async () => {
    const schema = chaca.schema({
      null: { type: () => modules.color.cmyk(), possibleNull: 1.5 },
    });

    await expect(schema.array(50)).rejects.toThrow(
      WrongPossibleNullDefinitionError,
    );
  });

  it("possibleNull = 0.6. should return at least one null value", async () => {
    const schema = chaca.schema({
      null: { type: () => modules.color.cmyk(), possibleNull: 0.6 },
    });

    const data = await schema.array(50);

    expect(countNulls(data)).toBeGreaterThan(0);
  });

  it("possibleNull = -0.6. Should throw an error", async () => {
    const schema = chaca.schema({
      null: { type: () => modules.color.cmyk(), possibleNull: -0.6 },
    });

    await expect(schema.array(50)).rejects.toThrow(
      WrongPossibleNullDefinitionError,
    );
  });
});
