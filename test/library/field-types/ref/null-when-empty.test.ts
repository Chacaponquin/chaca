import { describe, expect, it } from "vitest";
import { chaca, NotEnoughValuesForRefError } from "../../../../src";

describe("ref.nullWhenEmpty", () => {
  it("nullOnEmpty = false. should throw an error when there are not enough values", async () => {
    const schema = chaca.schema({ id: chaca.key(chaca.sequence()) });

    const schema2 = chaca.schema({
      ref: chaca.ref("schema.id", { unique: true, nullOnEmpty: false }),
    });

    const dataset = chaca.dataset([
      { name: "schema", schema: schema, documents: 10 },
      { name: "schema2", documents: 30, schema: schema2 },
    ]);

    await expect(dataset.generate()).rejects.toThrow(
      NotEnoughValuesForRefError,
    );
  });

  it("nullOnEmpty = true. should return null when there are no more values to take", async () => {
    const schema = chaca.schema({ id: chaca.key(chaca.sequence()) });

    const schema2 = chaca.schema({
      ref: chaca.ref("schema.id", { unique: true, nullOnEmpty: true }),
    });

    const dataset = chaca.dataset([
      { name: "schema", schema: schema, documents: 10 },
      { name: "schema2", documents: 30, schema: schema2 },
    ]);

    const data = await dataset.generate();

    const keys = data.schema.map((s: { id: number }) => s.id);

    for (let i = 0; i < data.schema2.length; i++) {
      const s2 = data.schema2[i].ref;

      if (i >= 10) {
        expect(s2).toBeNull();
      } else {
        expect(keys).include(s2);
      }
    }

    // the 10 non-null refs are unique, so together they use all key values
    const taken = data.schema2
      .map((s: { ref: number | null }) => s.ref)
      .filter((r: number | null) => r !== null);

    expect(new Set(taken).size).toBe(10);
  });
});
