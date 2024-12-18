import {
  chaca,
  modules,
  NotExistRefFieldError,
  TryRefANoKeyFieldError,
} from "../../../../src";
import { describe, expect, it } from "vitest";

describe("Ref field", () => {
  it("try ref a no key field. should throw an error", () => {
    const schema = chaca.schema({
      name: () => modules.internet.username(),
    });

    const schema2 = chaca.schema({ ref: chaca.ref("schema.name") });

    const dataset = chaca.dataset([
      { name: "schema", schema: schema, documents: 10 },
      { name: "schema2", documents: 10, schema: schema2 },
    ]);

    expect(() => dataset.generate()).toThrow(TryRefANoKeyFieldError);
  });

  describe("ref a nested schema", () => {
    it("from schema.ref reference schema2.object.id. all schema.ref values should reference one schema2.object.id value", () => {
      const schema = chaca.schema({
        object: chaca.schema({ id: chaca.key(chaca.sequence()) }),
      });

      const schema2 = chaca.schema({ ref: chaca.ref("schema.object.id") });

      const data = chaca
        .dataset([
          { name: "schema", documents: 50, schema: schema },
          { name: "schema2", documents: 50, schema: schema2 },
        ])
        .generate();

      for (const v of data.schema2) {
        expect(data.schema.map((s) => s.object.id)).include(v.ref);
      }
    });
  });

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

  it("try ref an empty string. should throw an error", () => {
    const schema = chaca.schema({});

    const schema2 = chaca.schema({ ref: chaca.ref("") });

    const dataset = chaca.dataset([
      { name: "schema", documents: 10, schema: schema },
      { name: "schema2", documents: 10, schema: schema2 },
    ]);

    expect(() => dataset.generate()).toThrow(NotExistRefFieldError);
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

  describe("ref a nested schema key field", () => {
    it("from schema.ref reference schema2.object.id", () => {
      const schema = chaca.schema({
        object: chaca.schema({
          id: chaca.key(() => modules.id.ulid()),
        }),
      });

      const schema2 = chaca.schema({ ref: chaca.ref("schema.object.id") });

      const dataset = chaca.dataset([
        { name: "schema", documents: 10, schema: schema },
        { name: "schema2", documents: 10, schema: schema2 },
      ]);

      const result = dataset.generate();

      for (const v of result.schema2.map((s) => s.ref)) {
        expect(result.schema.map((s) => s.object.id)).include(v);
      }
    });

    it("try ref an nested schema array field. should throw an error", () => {
      const schema = chaca.schema({
        array: {
          type: chaca.schema({
            id: chaca.key(() => modules.id.ulid()),
          }),
          isArray: 20,
        },
      });

      const schema2 = chaca.schema({ ref: chaca.ref("schema.array.id") });

      const dataset = chaca.dataset([
        { name: "schema", documents: 10, schema: schema },
        { name: "schema2", documents: 10, schema: schema2 },
      ]);

      expect(() => dataset.generate()).toThrow(NotExistRefFieldError);
    });
  });
});
