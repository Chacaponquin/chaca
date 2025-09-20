import { ChacaError, chaca, modules } from "../../../src";
import { describe, expect, it } from "vitest";

describe("Schema generation", () => {
  describe("generate object", () => {
    it("generate an empty schema. should return an empty object", async () => {
      const schema = chaca.schema({});

      expect(await schema.object()).toEqual({});
    });

    it("define a schema with id, name fields. should return a define schema object with id and name fields", async () => {
      const schema = chaca.schema({
        id: { type: () => modules.id.uuid() },
        name: { type: () => modules.person.firstName({ language: "es" }) },
      });

      const doc = await schema.object();

      expect(doc).toHaveProperty("id");
      expect(doc).toHaveProperty("name");
    });
  });

  describe("array generation", () => {
    it("documents = 10. should return an array with length 10", async () => {
      const schema = chaca.schema({
        id: { type: () => modules.id.uuid() },
        name: { type: () => modules.person.firstName() },
      });

      const docs = await schema.array(10);

      expect(docs).toHaveLength(10);

      for (const doc of docs) {
        expect(doc).toHaveProperty("id");
        expect(doc).toHaveProperty("name");
      }
    });

    it("documents = -10. should throw an error", () => {
      const schema = chaca.schema({
        id: { type: () => modules.id.uuid() },
        name: { type: () => modules.person.firstName() },
      });

      expect(async () => await schema.array(-10)).rejects.toThrow(ChacaError);
    });
  });
});
