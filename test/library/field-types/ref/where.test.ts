import { describe, expect, it } from "vitest";
import { chaca } from "../../../../src";

describe("ref.where", () => {
  it("where = undefined & unique = true. all documents should be related", () => {
    const schema = chaca.schema({
      number: chaca.key(chaca.sequence()),
    });

    const schema2 = chaca.schema({
      ref: chaca.ref("schema.number", {
        where: undefined,
        unique: true,
      }),
    });

    const data = chaca
      .dataset([
        { name: "schema", documents: 30, schema: schema },
        { name: "schema2", documents: 30, schema: schema2 },
      ])
      .generate();

    for (const s2 of data.schema2) {
      const unique = data.schema2.filter((v) => v.ref === s2.ref).length === 1;

      expect(unique).toBe(true);
    }
  });

  it("where function to filter all even numbers. should return only the odd numbers", () => {
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

    const data = chaca
      .dataset([
        { name: "schema", documents: 30, schema: schema },
        { name: "schema2", documents: 30, schema: schema2 },
      ])
      .generate();

    for (const s2 of data.schema2) {
      expect(s2.ref % 2 !== 0).toBe(true);
    }
  });
});
