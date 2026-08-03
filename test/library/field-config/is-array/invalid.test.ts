import { describe, expect, it } from "vitest";
import { chaca, Errors, modules } from "../../../../src";

describe("Is array invalid definition", () => {
  it("isArray = string. should throw an error", async () => {
    const schema = chaca.schema({
      id: { type: () => modules.id.uuid(), isArray: "hola" as never },
    });

    await expect(schema.object()).rejects.toThrow(
      Errors.WrongArrayDefinitionError,
    );
  });

  it("isArray = true. should throw an error", async () => {
    const schema = chaca.schema({
      id: { type: () => modules.id.uuid(), isArray: true as never },
    });

    await expect(schema.object()).rejects.toThrow(
      Errors.WrongArrayDefinitionError,
    );
  });
});
