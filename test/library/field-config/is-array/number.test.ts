import { describe, expect, it } from "vitest";
import { chaca, ChacaError, modules } from "../../../../src";

describe("Is array number definition", () => {
  it("isArray = 20. should return an array of documents with the id property with 20 values", async () => {
    const schema = chaca.schema({
      id: { type: () => modules.id.uuid(), isArray: 20 },
    });

    const doc = await schema.object();
    expect(doc.id).toHaveLength(20);
  });

  it("isArray = 0. should return an array with 0 elements", async () => {
    const schema = chaca.schema({
      id: { type: () => modules.id.uuid(), isArray: 0 },
    });

    const doc = await schema.object();
    expect(doc.id).toHaveLength(0);
  });

  it("isArray = -5. should throw an error", async () => {
    const schema = chaca.schema({
      id: { type: () => modules.id.uuid(), isArray: -5 },
    });

    await expect(schema.object()).rejects.toThrow(ChacaError);
  });
});
