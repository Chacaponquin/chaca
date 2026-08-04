import { describe, expect, it } from "vitest";
import { chaca, Errors, modules } from "../../../../src";

describe("Possible null invalid definition", () => {
  it("possibleNull = string. should throw an error", async () => {
    const schema = chaca.schema({
      null: {
        type: () => modules.color.cmyk(),
        possibleNull: "hola" as never,
      },
    });

    await expect(schema.array(10)).rejects.toThrow(
      Errors.WrongPossibleNullDefinitionError,
    );
  });

  it("possibleNull = object. should throw an error", async () => {
    const schema = chaca.schema({
      null: {
        type: () => modules.color.cmyk(),
        possibleNull: {} as never,
      },
    });

    await expect(schema.array(10)).rejects.toThrow(
      Errors.WrongPossibleNullDefinitionError,
    );
  });
});
