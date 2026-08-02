import { describe, expect, it } from "vitest";
import { chaca, ChacaError } from "../../../src";
import { PromiseGeneratorValue } from "../../shared/core/promise-value-generator";

describe("Dataset generation (schema count)", () => {
  const schema = chaca.schema({});

  const schema2 = chaca.schema({});

  describe("integer count", () => {
    it("generate dataset with 10 schema1 and 10 schema2. should return 10 schema1 documents and 10 schema2 documents", async () => {
      const dataset = chaca.dataset([
        { name: "schema1", documents: 10, schema: schema },
        { name: "schema2", documents: 10, schema: schema2 },
      ]);

      const data = await dataset.generate();

      expect(data.schema1).toHaveLength(10);
      expect(data.schema2).toHaveLength(10);
    });

    it("trying generate a schema data with documents = -10. should throw an error", async () => {
      const dataset = chaca.dataset([
        { name: "schema", documents: 10, schema: schema },
        { name: "schema2", documents: -10, schema: schema2 },
      ]);

      await expect(dataset.generate()).rejects.toThrow(ChacaError);
    });

    it("generate dataset with 10 schema1 and 0 schema2. should return 10 schema1 documents and 0 schema2 documents", async () => {
      const dataset = chaca.dataset([
        { name: "schema1", documents: 10, schema: schema },
        { name: "schema2", documents: 0, schema: schema2 },
      ]);

      const data = await dataset.generate();

      expect(data.schema1).toHaveLength(10);
      expect(data.schema2).toHaveLength(0);
    });
  });

  describe("async function count", () => {
    it("generate dataset with schema1 count as async function that return 10. should return an schema1 10 length array", async () => {
      const dataset = chaca.dataset([
        {
          name: "schema1",
          documents: () => {
            return PromiseGeneratorValue.execute(10);
          },
          schema: schema,
        },
      ]);

      const data = await dataset.generate();

      expect(data.schema1).toHaveLength(10);
    });

    it("generate dataset with schema1 count as async function that return 0. should return an schema1 empty array", async () => {
      const dataset = chaca.dataset([
        {
          name: "schema1",
          documents: () => {
            return PromiseGeneratorValue.execute(0);
          },
          schema: schema,
        },
      ]);

      const data = await dataset.generate();

      expect(data.schema1).toHaveLength(0);
    });

    it("generate dataset with schema1 count as async function that return a negative number. should throw an error", async () => {
      const dataset = chaca.dataset([
        {
          name: "schema1",
          documents: () => {
            return PromiseGeneratorValue.execute(-1);
          },
          schema: schema,
        },
      ]);

      await expect(dataset.generate()).rejects.toThrow(ChacaError);
    });
  });

  describe("count function with store argument", () => {
    it("schema2 count depends on schema1 documents. should generate one schema2 document per schema1 document", async () => {
      const dataset = chaca.dataset([
        { name: "schema1", documents: 7, schema: schema },
        {
          name: "schema2",
          documents: async ({ store }) => {
            const docs = await store.get("schema1");
            return docs.length;
          },
          schema: schema2,
        },
      ]);

      const data = await dataset.generate();

      expect(data.schema1).toHaveLength(7);
      expect(data.schema2).toHaveLength(7);
    });
  });

  describe("invalid count", () => {
    it("documents = string. should throw an error", async () => {
      const dataset = chaca.dataset([
        { name: "schema1", documents: "10" as never, schema: schema },
      ]);

      await expect(dataset.generate()).rejects.toThrow(ChacaError);
    });
  });

  describe("function count", () => {
    it("generate dataset with schema1 count as function that return 0. should return an schema1 empty array", async () => {
      const dataset = chaca.dataset([
        { name: "schema1", documents: () => 0, schema: schema },
      ]);

      const data = await dataset.generate();

      expect(data.schema1).toHaveLength(0);
    });

    it("generate dataset with schema1 count as function that return 10. should return an schema1 10 length array", async () => {
      const dataset = chaca.dataset([
        { name: "schema1", documents: () => 10, schema: schema },
      ]);

      const data = await dataset.generate();

      expect(data.schema1).toHaveLength(10);
    });

    it("generate dataset with schema1 count as function that return -10. should throw an error", async () => {
      const dataset = chaca.dataset([
        { name: "schema1", documents: () => -10, schema: schema },
      ]);

      await expect(dataset.generate()).rejects.toThrow(ChacaError);
    });
  });
});
