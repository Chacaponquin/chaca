import { describe, expect, it } from "vitest";
import { chaca, ChacaError, modules } from "../../../src";

describe("Dataset store", () => {
  describe("store.currentDocuments", () => {
    it("get previous documents", () => {
      const schema = chaca.schema({
        store: ({ store }) => {
          return store.currentDocuments();
        },
      });

      const dataset = chaca.dataset([
        { name: "schema", documents: 10, schema: schema },
      ]);

      const result = dataset.generate();

      for (let index = 0; index < result.schema.length; index++) {
        expect(result.schema[index].store).toHaveLength(index);
      }
    });
  });

  describe("store.get", () => {
    it("get not existing field values (schema.object.id). should throw an error", () => {
      const schema = chaca.schema({
        id: () => modules.id.uuid(),
      });

      const schema2 = chaca.schema({
        store: ({ store }) => {
          return store.get("schema.object.id");
        },
      });

      const dataset = chaca.dataset([
        { name: "schema", documents: 10, schema: schema },
        { name: "schema2", documents: 10, schema: schema2 },
      ]);

      expect(() => dataset.generate()).toThrow(ChacaError);
    });

    it("get all schema.object.id values", () => {
      const schema = chaca.schema({
        object: chaca.schema({ id: () => modules.id.uuid() }),
      });

      const schema2 = chaca.schema({
        store: ({ store }) => {
          return store.get("schema.object.id");
        },
      });

      const dataset = chaca.dataset([
        { name: "schema", documents: 10, schema: schema },
        { name: "schema2", documents: 10, schema: schema2 },
      ]);

      const result = dataset.generate();

      for (const v of result.schema2) {
        expect(v.store).toEqual(result.schema.map((s) => s.object.id));
      }
    });

    it("get all schema.id values", () => {
      const schema = chaca.schema({
        id: () => modules.id.uuid(),
      });

      const schema2 = chaca.schema({
        store: ({ store }) => {
          return store.get("schema.id");
        },
      });

      const dataset = chaca.dataset([
        { name: "schema", documents: 10, schema: schema },
        { name: "schema2", documents: 10, schema: schema2 },
      ]);

      const result = dataset.generate();

      for (const v of result.schema2) {
        expect(v.store).toEqual(result.schema.map((s) => s.id));
      }
    });

    it("get all schema objects", () => {
      const schema = chaca.schema({});

      const schema2 = chaca.schema({
        store: ({ store }) => {
          return store.get("schema");
        },
      });

      const dataset = chaca.dataset([
        { name: "schema", documents: 10, schema: schema },
        { name: "schema2", documents: 10, schema: schema2 },
      ]);

      const result = dataset.generate();

      for (const v of result.schema2) {
        for (const object of v.store) {
          expect(object).toEqual({});
        }
      }
    });
  });
});
