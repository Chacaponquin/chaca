import { describe, expect, it } from "vitest";
import { chaca, NotEnoughValuesForRefError } from "../../../../src";

describe("ref.nullWhenEmpty", () => {
  it("nullWhenEmpty = false. should throw an error", () => {
    const schema = chaca.schema({ id: chaca.key(chaca.sequence()) });

    const schema2 = chaca.schema({
      ref: chaca.ref("schema.id", { unique: true, nullOnEmpty: false }),
    });

    const dataset = chaca.dataset([
      { name: "schema", schema: schema, documents: 10 },
      { name: "schema2", documents: 30, schema: schema2 },
    ]);

    expect(() => dataset.generate()).toThrow(NotEnoughValuesForRefError);
  });

  it("nullWhenEmpty = false. should throw an error", () => {
    const schema = chaca.schema({ id: chaca.key(chaca.sequence()) });

    const schema2 = chaca.schema({
      ref: chaca.ref("schema.id", { unique: true, nullOnEmpty: true }),
    });

    const dataset = chaca.dataset([
      { name: "schema", schema: schema, documents: 10 },
      { name: "schema2", documents: 30, schema: schema2 },
    ]);

    const data = dataset.generate();

    for (let i = 0; i < data.schema2.length; i++) {
      const s2 = data.schema2[i].ref;

      const s1 = data.schema.map((s) => s.id);

      if (i >= 10) {
        expect(s2).toBeNull();
      } else {
        expect(s1).include(s2);
      }
    }
  });
});
