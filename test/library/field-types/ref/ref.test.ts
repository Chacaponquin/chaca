import { chaca, modules, NotExistRefFieldError } from "../../../../src";
import { describe, expect, it } from "vitest";

describe("Ref field", () => {
  it("create a correct ref field", () => {
    const schema = chaca.schema({
      id: chaca.key(() => modules.id.uuid()),
    });

    const schema2 = chaca.schema({ ref: chaca.ref("schema.id") });

    const data = chaca
      .dataset([
        { name: "schema", documents: 30, schema: schema },
        { name: "schema2", documents: 30, schema: schema2 },
      ])
      .generate();

    for (const s2 of data.schema2) {
      const values = data.schema.map((s) => s.id);

      expect(values).include(s2.ref);
    }
  });

  describe("ref own schema", () => {
    it("ref own schema inside a dataset. should return first ref with null value, and rest correct", () => {
      const schema = chaca.schema({
        id: chaca.key(chaca.sequence()),
        ref: chaca.ref("schema.id"),
      });

      const data = chaca
        .dataset([{ name: "schema", documents: 50, schema: schema }])
        .generate();

      expect(data.schema[0].ref).toBeNull();
      expect(data.schema[1].ref).toBe(data.schema[0].id);

      for (const v of data.schema.slice(2)) {
        expect(
          data.schema.filter((s) => s.id !== v.id).map((s) => s.id),
        ).include(v.ref);
      }
    });
  });

  it("try ref a not existing field. should throw an error", () => {
    const dataset1 = chaca.schema({
      id: chaca.key(() => modules.id.uuid()),
    });

    const dataset2 = chaca.schema({ id: chaca.ref("Dataset1.customId") });

    const dataset = chaca.dataset([
      { name: "Dataset1", documents: 30, schema: dataset1 },
      { name: "Dataset2", documents: 30, schema: dataset2 },
    ]);

    expect(() => {
      dataset.generate();
    }).toThrow(NotExistRefFieldError);
  });
});
