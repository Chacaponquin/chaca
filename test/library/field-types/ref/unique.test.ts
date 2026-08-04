import { describe, expect, it } from "vitest";
import { chaca, NotEnoughValuesForRefError } from "../../../../src";

describe("ref.unique", () => {
  it("unique = true. each referenced value belongs to the ref schema keys and is taken only once", async () => {
    const schema = chaca.schema({
      id: chaca.key(chaca.sequence()),
    });

    const schema2 = chaca.schema({
      ref: chaca.ref("schema.id", { unique: true }),
    });

    const data = await chaca
      .dataset([
        { name: "schema", documents: 30, schema: schema },
        { name: "schema2", documents: 30, schema: schema2 },
      ])
      .generate();

    const keys = data.schema.map((s: { id: number }) => s.id);
    const refs = data.schema2.map((s: { ref: number }) => s.ref);

    for (const ref of refs) {
      expect(keys).include(ref);
    }

    // all referenced values must be distinct across documents
    expect(new Set(refs).size).toBe(refs.length);
  });

  it("unique = true with fewer key values than documents. should throw NotEnoughValuesForRefError", async () => {
    const schema = chaca.schema({
      id: chaca.key(chaca.sequence()),
    });

    const schema2 = chaca.schema({
      ref: chaca.ref("schema.id", { unique: true }),
    });

    const dataset = chaca.dataset([
      { name: "schema", documents: 5, schema: schema },
      { name: "schema2", documents: 10, schema: schema2 },
    ]);

    await expect(dataset.generate()).rejects.toThrow(
      NotEnoughValuesForRefError,
    );
  });

  describe("with array field definition", () => {
    it("unique = true & isArray = 5. the array values should be unique", async () => {
      const schema = chaca.schema({
        id: chaca.key(chaca.sequence()),
      });

      const schema2 = chaca.schema({
        ref: {
          type: chaca.ref("schema.id", { unique: true }),
          isArray: 5,
        },
      });

      const data = await chaca
        .dataset([
          { name: "schema", documents: 50, schema: schema },
          { name: "schema2", documents: 10, schema: schema2 },
        ])
        .generate();

      for (let index = 0; index < data.schema2.length; index++) {
        const element = data.schema2[index];

        for (const v of element.ref) {
          expect(data.schema.map((s: { id: string }) => s.id)).include(v);
          expect(element.ref.filter((r: string) => r === v)).toHaveLength(1);

          for (const oelement of data.schema2) {
            if (oelement !== element) {
              expect(oelement.ref.filter((o: string) => o === v)).toHaveLength(
                0,
              );
            }
          }
        }
      }
    });

    it("unique = true & nullOnEmpty = false. should throw NotEnoughValuesForRefError as soon as the array runs out of values mid-fill", async () => {
      const schema = chaca.schema({ id: chaca.key(chaca.sequence()) });

      const schema2 = chaca.schema({
        ref: {
          type: chaca.ref("schema.id", { unique: true, nullOnEmpty: false }),
          isArray: 10,
        },
      });

      const dataset = chaca.dataset([
        { name: "schema", documents: 4, schema: schema },
        { name: "schema2", documents: 1, schema: schema2 },
      ]);

      await expect(dataset.generate()).rejects.toThrow(
        NotEnoughValuesForRefError,
      );
    });
  });

  describe("two different unique ref fields pointing to the same route", () => {
    it("should track taken values independently per field, allowing the same value to be reused across fields", async () => {
      const schema = chaca.schema({ id: chaca.key(chaca.sequence()) });

      const schema2 = chaca.schema({
        refA: chaca.ref("schema.id", { unique: true }),
        refB: chaca.ref("schema.id", { unique: true }),
      });

      const data = await chaca
        .dataset([
          { name: "schema", documents: 5, schema: schema },
          { name: "schema2", documents: 5, schema: schema2 },
        ])
        .generate();

      const keys = data.schema.map((s: { id: number }) => s.id);
      const refsA = data.schema2.map((s: { refA: number }) => s.refA);
      const refsB = data.schema2.map((s: { refB: number }) => s.refB);

      // each field is unique on its own
      expect(new Set(refsA).size).toBe(refsA.length);
      expect(new Set(refsB).size).toBe(refsB.length);

      for (const v of [...refsA, ...refsB]) {
        expect(keys).include(v);
      }
    });
  });

  describe("ref own schema", () => {
    it("unique = true. all schema documents should be related and the first document ref value should be null", async () => {
      const schema = chaca.schema({
        id: chaca.key(chaca.sequence()),
        ref: chaca.ref("schema.id", {
          unique: true,
        }),
      });

      const data = await chaca
        .dataset([{ name: "schema", documents: 30, schema: schema }])
        .generate();

      expect(data.schema[0].ref).toBeNull();

      for (const s of data.schema.slice(1)) {
        const unique = data.schema.filter(
          (v: { id: string }) => v.id === s.ref,
        );

        expect(unique.length === 1).toBe(true);
      }
    });
  });
});
