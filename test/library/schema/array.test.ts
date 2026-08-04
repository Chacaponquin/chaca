import { describe, expect, it } from "vitest";
import { chaca, ChacaError, modules } from "../../../src";

describe("Schema array generation", () => {
  it("documents = 10. should return an array with length 10", async () => {
    const schema = chaca.schema({
      id: { type: () => modules.id.uuid() },
      name: { type: () => modules.person.firstName() },
    });

    const docs = await schema.array(10);

    expect(docs).toHaveLength(10);

    for (const doc of docs) {
      expect(Object.keys(doc).sort()).toEqual(["id", "name"]);
    }
  });

  it("documents = 0. should return an empty array", async () => {
    const schema = chaca.schema({
      id: { type: () => modules.id.uuid() },
      name: { type: () => modules.person.firstName() },
    });

    const docs = await schema.array(0);

    expect(docs).toEqual([]);
  });

  it("documents = -10. should throw an error", async () => {
    const schema = chaca.schema({
      id: { type: () => modules.id.uuid() },
      name: { type: () => modules.person.firstName() },
    });

    await expect(schema.array(-10)).rejects.toThrow(ChacaError);
  });

  it("documents = undefined. should throw an error", () => {
    const schema = chaca.schema({
      id: { type: () => modules.id.uuid() },
    });

    expect(() => schema.array(undefined as never)).toThrow(ChacaError);
  });

  it("each document is generated independently", async () => {
    let counter = 0;

    const schema = chaca.schema({
      index: { type: () => counter++ },
    });

    const docs = await schema.array(3);

    expect(docs.map((d) => d.index)).toEqual([0, 1, 2]);
  });
});
