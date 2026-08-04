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

  describe("with array field definition", () => {
    it("nullOnEmpty = true & unique = true. should return an array only with the refs that could be taken", async () => {
      const schema = chaca.schema({ id: chaca.key(chaca.sequence()) });

      const schema2 = chaca.schema({
        ref: {
          type: chaca.ref("schema.id", { unique: true, nullOnEmpty: true }),
          isArray: 100,
        },
      });

      const data = await chaca
        .dataset([
          { name: "schema", documents: 6, schema: schema },
          { name: "schema2", documents: 1, schema: schema2 },
        ])
        .generate();

      const refs = data.schema2[0].ref as number[];

      const keys = data.schema.map((s: { id: number }) => s.id);

      expect(refs).toHaveLength(6);
      expect(refs.every((r) => r !== null)).toBe(true);
      expect(new Set(refs).size).toBe(6);

      for (const r of refs) {
        expect(keys).include(r);
      }
    });

    it("nullOnEmpty = true & unique = true. should return an empty array when there are no values left", async () => {
      const schema = chaca.schema({ id: chaca.key(chaca.sequence()) });

      const schema2 = chaca.schema({
        ref: {
          type: chaca.ref("schema.id", { unique: true, nullOnEmpty: true }),
          isArray: 100,
        },
      });

      const data = await chaca
        .dataset([
          { name: "schema", documents: 6, schema: schema },
          { name: "schema2", documents: 3, schema: schema2 },
        ])
        .generate();

      const all = data.schema2.map((s: { ref: number[] }) => s.ref);

      // the first document takes every available value, the rest get nothing
      expect(all[0]).toHaveLength(6);
      expect(all[1]).toHaveLength(0);
      expect(all[2]).toHaveLength(0);

      expect(new Set(all.flat()).size).toBe(6);
    });

    it("ref own schema. the first document should return an empty array", async () => {
      const schema = chaca.schema({
        id: chaca.key(chaca.sequence()),
        ref: { type: chaca.ref("schema.id"), isArray: 5 },
      });

      const data = await chaca
        .dataset([{ name: "schema", documents: 4, schema: schema }])
        .generate();

      expect(data.schema[0].ref).toHaveLength(0);

      for (const v of data.schema.slice(1)) {
        expect(v.ref).toHaveLength(5);

        for (const r of v.ref) {
          expect(r).not.toBeNull();
          expect(r).not.toBe(v.id);
        }
      }
    });

    it("referenced schema has 0 documents. should return an empty array instead of throwing", async () => {
      const schema = chaca.schema({ id: chaca.key(chaca.sequence()) });

      const schema2 = chaca.schema({
        ref: {
          type: chaca.ref("schema.id", { nullOnEmpty: true }),
          isArray: 5,
        },
      });

      const data = await chaca
        .dataset([
          { name: "schema", documents: 0, schema: schema },
          { name: "schema2", documents: 3, schema: schema2 },
        ])
        .generate();

      for (const s2 of data.schema2) {
        expect(s2.ref).toHaveLength(0);
      }
    });
  });
});
