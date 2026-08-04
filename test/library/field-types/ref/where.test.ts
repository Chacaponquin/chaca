import { describe, expect, it } from "vitest";
import { chaca, NotEnoughValuesForRefError } from "../../../../src";

describe("ref.where", () => {
  describe("ref with array definition", () => {
    it("try ref all schema.id values. schema2.ref should be an array with all schema.id values", async () => {
      const schema = chaca.schema({
        id: chaca.key(chaca.sequence()),
      });

      const schema2 = chaca.schema({
        ref: {
          type: chaca.ref("schema.id", {
            where: ({ refFields, currentFields }) => {
              return !currentFields.ref.includes(refFields.id);
            },
          }),
          isArray: 50,
        },
      });

      const data = await chaca
        .dataset([
          { name: "schema", documents: 50, schema: schema },
          { name: "schema2", documents: 50, schema: schema2 },
        ])
        .generate();

      const keys = data.schema.map((s: { id: number }) => s.id);

      for (const s2 of data.schema2) {
        expect(s2.ref).toHaveLength(50);

        for (const v of s2.ref) {
          expect(keys).include(v);
          expect(s2.ref.filter((s: { id: number }) => s === v)).toHaveLength(1);
        }
      }
    });
  });

  it("where = undefined & unique = true. all documents should be related", async () => {
    const schema = chaca.schema({
      number: chaca.key(chaca.sequence()),
    });

    const schema2 = chaca.schema({
      ref: chaca.ref("schema.number", {
        where: undefined,
        unique: true,
      }),
    });

    const data = await chaca
      .dataset([
        { name: "schema", documents: 30, schema: schema },
        { name: "schema2", documents: 30, schema: schema2 },
      ])
      .generate();

    for (const s2 of data.schema2) {
      const unique = data.schema2.filter(
        (v: { ref: number }) => v.ref === s2.ref,
      );

      expect(unique.length === 1).toBe(true);
    }
  });

  it("where function to filter all even numbers. should return only the odd numbers", async () => {
    const schema = chaca.schema({
      number: chaca.key(chaca.sequence()),
    });

    const schema2 = chaca.schema({
      ref: chaca.ref("schema.number", {
        where: ({ refFields }) => {
          return refFields.number % 2 !== 0;
        },
      }),
    });

    const data = await chaca
      .dataset([
        { name: "schema", documents: 30, schema: schema },
        { name: "schema2", documents: 30, schema: schema2 },
      ])
      .generate();

    const keys = data.schema.map((s: { number: number }) => s.number);

    for (const s2 of data.schema2) {
      expect(s2.ref % 2 !== 0).toBe(true);
      expect(keys).include(s2.ref);
    }
  });

  it("where = undefined & unique = true. all refs belong to schema keys", async () => {
    const schema = chaca.schema({
      number: chaca.key(chaca.sequence()),
    });

    const schema2 = chaca.schema({
      ref: chaca.ref("schema.number", {
        where: undefined,
        unique: true,
      }),
    });

    const data = await chaca
      .dataset([
        { name: "schema", documents: 30, schema: schema },
        { name: "schema2", documents: 30, schema: schema2 },
      ])
      .generate();

    const keys = data.schema.map((s: { number: number }) => s.number);

    for (const s2 of data.schema2) {
      expect(keys).include(s2.ref);
    }
  });

  describe("where filters out every value", () => {
    it("without nullOnEmpty. should throw NotEnoughValuesForRefError", async () => {
      const schema = chaca.schema({
        number: chaca.key(chaca.sequence()),
      });

      const schema2 = chaca.schema({
        ref: chaca.ref("schema.number", {
          where: () => false,
        }),
      });

      const dataset = chaca.dataset([
        { name: "schema", documents: 10, schema: schema },
        { name: "schema2", documents: 10, schema: schema2 },
      ]);

      await expect(dataset.generate()).rejects.toThrow(
        NotEnoughValuesForRefError,
      );
    });

    it("with nullOnEmpty = true. all refs should be null", async () => {
      const schema = chaca.schema({
        number: chaca.key(chaca.sequence()),
      });

      const schema2 = chaca.schema({
        ref: chaca.ref("schema.number", {
          where: () => false,
          nullOnEmpty: true,
        }),
      });

      const data = await chaca
        .dataset([
          { name: "schema", documents: 10, schema: schema },
          { name: "schema2", documents: 10, schema: schema2 },
        ])
        .generate();

      for (const s2 of data.schema2) {
        expect(s2.ref).toBeNull();
      }
    });

    describe("with array field definition and nullOnEmpty = true", () => {
      it("where lets only the odd numbers through. the array should stop once every odd number was taken, instead of padding with null", async () => {
        const schema = chaca.schema({
          number: chaca.key(chaca.sequence()),
        });

        const schema2 = chaca.schema({
          ref: {
            type: chaca.ref("schema.number", {
              unique: true,
              nullOnEmpty: true,
              where: ({ refFields }) => refFields.number % 2 !== 0,
            }),
            isArray: 20,
          },
        });

        const data = await chaca
          .dataset([
            { name: "schema", documents: 10, schema: schema },
            { name: "schema2", documents: 1, schema: schema2 },
          ])
          .generate();

        const refs = data.schema2[0].ref as number[];

        // only 5 odd numbers exist among 1..10, isArray asks for 20
        expect(refs).toHaveLength(5);
        expect(refs.every((r) => r % 2 !== 0)).toBe(true);
        expect(new Set(refs).size).toBe(5);
      });
    });
  });
});
