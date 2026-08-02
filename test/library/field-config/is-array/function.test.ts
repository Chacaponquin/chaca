import { describe, expect, it } from "vitest";
import { chaca, ChacaError, Errors, modules } from "../../../../src";

describe("Is array function definition", () => {
  it("isArray = function that returns undefined. should always return a not array value", async () => {
    const schema = chaca.schema({
      id: { type: () => modules.id.uuid(), isArray: () => undefined },
    });

    const doc = await schema.object();

    expect(typeof doc.id).toBe("string");
  });

  describe("number definition", () => {
    it("isArray = () => 20. should return an array of documents with the id property with 20 values", async () => {
      const schema = chaca.schema({
        id: { type: () => modules.id.uuid(), isArray: () => 20 },
      });

      const doc = await schema.object();

      expect(doc.id).toHaveLength(20);
    });

    it("isArray = 0. should return an array with 0 elements", async () => {
      const schema = chaca.schema({
        id: { type: () => modules.id.uuid(), isArray: () => 0 },
      });

      const doc = await schema.object();
      expect(doc.id).toHaveLength(0);
    });

    it("isArray = -5. should throw an error", async () => {
      const schema = chaca.schema({
        id: { type: () => modules.id.uuid(), isArray: () => -5 },
      });

      await expect(schema.object()).rejects.toThrow(ChacaError);
    });

    it("isArray = function that returns a string. should throw an error", async () => {
      const schema = chaca.schema({
        id: {
          type: () => modules.id.uuid(),
          isArray: () => "hola" as never,
        },
      });

      await expect(schema.object()).rejects.toThrow(
        Errors.WrongArrayDefinitionError,
      );
    });
  });

  describe("object definition", () => {
    describe("min and max argument", () => {
      it("isArray = () => {}. should return an array with length between 0 and 10", async () => {
        const schema = chaca.schema({
          id: { type: () => modules.id.mongodbId(), isArray: () => ({}) },
        });
        const docs = await schema.object();
        const id = docs.id;

        expect(id.length).toBeGreaterThanOrEqual(0);
        expect(id.length).toBeLessThanOrEqual(10);
      });

      it("function that returns min = 3 & max = 10. should return an array with length between min and max parameters", async () => {
        const schema = chaca.schema({
          id: {
            type: () => modules.id.uuid(),
            isArray: () => ({ min: 3, max: 10 }),
          },
        });
        const docs = await schema.object();
        const id = docs.id;

        expect(id.length >= 3 && id.length <= 10).toBe(true);
      });

      it("function that returns min = 0 & max = 0. should return an empty array", async () => {
        const schema = chaca.schema({
          id: {
            type: () => modules.id.uuid(),
            isArray: () => ({ min: 0, max: 0 }),
          },
        });
        const docs = await schema.object();
        const id = docs.id;

        expect(id).toHaveLength(0);
      });

      it("function that returns min = 5 & max = 0. should return throw an error", async () => {
        const schema = chaca.schema({
          id: {
            type: () => modules.id.uuid(),
            isArray: () => ({ min: 5, max: 0 }),
          },
        });

        await expect(schema.object()).rejects.toThrow(ChacaError);
      });
    });
  });

  describe("function arguments", () => {
    it("the function receives currentFields and store", async () => {
      let receivedArgs: unknown;

      const schema = chaca.schema({
        name: () => "chaca",
        tags: {
          type: () => "tag",
          isArray: (args) => {
            receivedArgs = args;
            return 2;
          },
        },
      });

      const doc = await schema.object();

      expect(doc.tags).toHaveLength(2);
      expect(receivedArgs).toHaveProperty("currentFields");
      expect(receivedArgs).toHaveProperty("store");
    });
  });
});
