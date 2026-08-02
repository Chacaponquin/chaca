import { describe, expect, it } from "vitest";
import { chaca, ChacaError, modules } from "../../../src";

describe("Dataset store", () => {
  describe("store.currentDocuments", () => {
    it("get previous documents", async () => {
      const schema = chaca.schema({
        store: ({ store }) => {
          return store.currentDocuments();
        },
      });

      const dataset = chaca.dataset([
        { name: "schema", documents: 10, schema: schema },
      ]);

      const result = await dataset.generate();

      for (let index = 0; index < result.schema.length; index++) {
        expect(result.schema[index].store).toHaveLength(index);
      }
    });
  });

  describe("store.get", () => {
    describe("where config", () => {
      it("get schema.id greater than 5", async () => {
        const schema = chaca.schema({
          id: chaca.sequence(),
        });

        const schema2 = chaca.schema({
          store: ({ store }) => {
            return store.get("schema.id", {
              where: (fields) => {
                return fields.id > 5;
              },
            });
          },
        });

        const dataset = chaca.dataset([
          { name: "schema", documents: 10, schema: schema },
          { name: "schema2", documents: 10, schema: schema2 },
        ]);

        const result = await dataset.generate();

        for (const v of result.schema2) {
          expect(v.store).toEqual([6, 7, 8, 9, 10]);
        }
      });
    });

    it("get not existing field values (schema.object.id). should throw an error", async () => {
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

      await expect(dataset.generate()).rejects.toThrow(ChacaError);
    });

    it("get all schema.object.id values", async () => {
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

      const result = await dataset.generate();

      for (const v of result.schema2) {
        expect(v.store).toEqual(
          result.schema.map((s: { object: { id: number } }) => s.object.id),
        );
      }
    });

    it("get all schema.id values", async () => {
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

      const result = await dataset.generate();

      for (const v of result.schema2) {
        expect(v.store).toEqual(result.schema.map((s: { id: number }) => s.id));
      }
    });

    it("two schemas that access each other. should throw a cyclic access error", async () => {
      const schema = chaca.schema({
        value: ({ store }) => store.get("schema2.value"),
      });

      const schema2 = chaca.schema({
        value: ({ store }) => store.get("schema.value"),
      });

      const dataset = chaca.dataset([
        { name: "schema", documents: 5, schema: schema },
        { name: "schema2", documents: 5, schema: schema2 },
      ]);

      await expect(dataset.generate()).rejects.toThrow(ChacaError);
    });

    it("get all schema objects", async () => {
      const schema = chaca.schema({});

      const schema2 = chaca.schema({
        store: async ({ store }) => {
          return await store.get("schema");
        },
      });

      const dataset = chaca.dataset([
        { name: "schema", documents: 10, schema: schema },
        { name: "schema2", documents: 10, schema: schema2 },
      ]);

      const result = await dataset.generate();

      for (const v of result.schema2) {
        for (const object of v.store) {
          expect(object).toEqual({});
        }
      }
    });
  });
});
