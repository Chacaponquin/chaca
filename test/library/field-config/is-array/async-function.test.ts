import { describe, expect, it } from "vitest";
import { chaca, ChacaError, modules } from "../../../../src";
import { PromiseGeneratorValue } from "../../../shared/core/promise-value-generator";

describe("Is array function definition", () => {
  it("isArray = async function that returns undefined. should always return a not array value", async () => {
    const schema = chaca.schema({
      id: {
        type: () => modules.id.uuid(),
        isArray: () => PromiseGeneratorValue.execute(undefined),
      },
    });

    const doc = await schema.object();

    expect(typeof doc.id).toBe("string");
  });

  describe("number definition", () => {
    it("isArray = async () => 20. should return an array of documents with the id property with 20 values", async () => {
      const schema = chaca.schema({
        id: {
          type: () => modules.id.uuid(),
          isArray: () => PromiseGeneratorValue.execute(20),
        },
      });

      const doc = await schema.object();

      expect(doc.id).toHaveLength(20);
    });

    it("isArray = async function that return 0. should return an array with 0 elements", async () => {
      const schema = chaca.schema({
        id: {
          type: () => modules.id.uuid(),
          isArray: () => PromiseGeneratorValue.execute(0),
        },
      });

      const doc = await schema.object();

      expect(doc.id).toHaveLength(0);
    });

    it("isArray = async function that returns -5. should throw an error", () => {
      const schema = chaca.schema({
        id: {
          type: () => modules.id.uuid(),
          isArray: () => PromiseGeneratorValue.execute(-5),
        },
      });

      expect(() => schema.object()).rejects.toThrow(ChacaError);
    });
  });

  describe("object definition", () => {
    describe("min and max argument", () => {
      it("async function that returns {}. should return an array with length between 0 and 10", async () => {
        const schema = chaca.schema({
          id: {
            type: () => modules.id.mongodbId(),
            isArray: () => PromiseGeneratorValue.execute({}),
          },
        });

        const docs = await schema.object();
        const id = docs.id;

        expect(id.length).toBeGreaterThanOrEqual(0);
        expect(id.length).toBeLessThanOrEqual(10);
      });

      it("async function that returns min = 3 & max = 10. should return an array with length between min and max parameters", async () => {
        const schema = chaca.schema({
          id: {
            type: () => modules.id.uuid(),
            isArray: () => PromiseGeneratorValue.execute({ min: 3, max: 10 }),
          },
        });
        const docs = await schema.object();
        const id = docs.id;

        expect(id.length >= 3 && id.length <= 10).toBe(true);
      });

      it("async function that returns min = 0 & max = 0. should return an empty array", async () => {
        const schema = chaca.schema({
          id: {
            type: () => modules.id.uuid(),
            isArray: () => PromiseGeneratorValue.execute({ min: 0, max: 0 }),
          },
        });

        const docs = await schema.object();
        const id = docs.id;

        expect(id).toHaveLength(0);
      });

      it("async function that returns min = 5 & max = 0. should return throw an error", () => {
        const schema = chaca.schema({
          id: {
            type: () => modules.id.uuid(),
            isArray: () => PromiseGeneratorValue.execute({ min: 5, max: 0 }),
          },
        });

        expect(() => schema.object()).rejects.toThrow(ChacaError);
      });
    });
  });
});
