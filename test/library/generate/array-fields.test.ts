import { chaca, ChacaError, modules } from "../../../src";
import { describe, expect, it } from "vitest";

describe("Array fields defintion", () => {
  describe("function definition", () => {
    describe("number definition", () => {
      it("isArray = () => 20. should return an array of documents with the id property with 20 values", () => {
        const schema = chaca.schema({
          id: { type: () => modules.id.uuid(), isArray: () => 20 },
        });

        const doc = schema.object();
        expect(doc.id).toHaveLength(20);
      });

      it("isArray = 0. should return an array with 0 elements", () => {
        const schema = chaca.schema({
          id: { type: () => modules.id.uuid(), isArray: () => 0 },
        });

        const doc = schema.object();
        expect(doc.id).toHaveLength(0);
      });

      it("isArray = -5. should throw an error", () => {
        const schema = chaca.schema({
          id: { type: () => modules.id.uuid(), isArray: () => -5 },
        });

        expect(() => schema.object()).toThrow(ChacaError);
      });
    });

    describe("object definition", () => {
      describe("min and max argument", () => {
        it("isArray = () => {}. should return an array with length between 0 and 10", () => {
          const schema = chaca.schema({
            id: { type: () => modules.id.mongodbId(), isArray: () => ({}) },
          });
          const docs = schema.object();
          const id = docs.id;

          expect(id.length).toBeGreaterThanOrEqual(0);
          expect(id.length).toBeLessThanOrEqual(10);
        });

        it("function that returns min = 3 & max = 10. should return an array with length betwwen min and max parameters", () => {
          const schema = chaca.schema({
            id: {
              type: () => modules.id.uuid(),
              isArray: () => ({ min: 3, max: 10 }),
            },
          });
          const docs = schema.object();
          const id = docs.id;

          expect(id.length >= 3 && id.length <= 10).toBe(true);
        });

        it("function that returns min = 0 & max = 0. should return an empty array", () => {
          const schema = chaca.schema({
            id: {
              type: () => modules.id.uuid(),
              isArray: () => ({ min: 0, max: 0 }),
            },
          });
          const docs = schema.object();
          const id = docs.id;

          expect(id).toHaveLength(0);
        });

        it("function that returns min = 5 & max = 0. should return throw an error", () => {
          const schema = chaca.schema({
            id: {
              type: () => modules.id.uuid(),
              isArray: () => ({ min: 5, max: 0 }),
            },
          });

          expect(() => schema.object()).toThrow(ChacaError);
        });
      });
    });
  });

  describe("object definition", () => {
    describe("max argument", () => {
      it("max = 10. should return an array with length <= max parameter", () => {
        const schema = chaca.schema({
          id: { type: () => modules.id.mongodbId(), isArray: { max: 10 } },
        });
        const docs = schema.object();
        const id = docs.id;

        expect(id.length).toBeLessThanOrEqual(10);
      });

      it("max = -10. should throw an error", () => {
        const schema = chaca.schema({
          id: { type: () => modules.id.mongodbId(), isArray: { max: -10 } },
        });

        expect(() => schema.object()).toThrow(ChacaError);
      });

      it("max = 0. should return an empty array", () => {
        const schema = chaca.schema({
          id: { type: () => modules.id.mongodbId(), isArray: { max: 0 } },
        });
        const docs = schema.object();
        const id = docs.id;

        expect(id).toHaveLength(0);
      });
    });

    describe("min argument", () => {
      it("min = 3. should return an array with length >= min parameter", () => {
        const schema = chaca.schema({
          id: { type: () => modules.id.uuid(), isArray: { min: 3 } },
        });
        const docs = schema.object();
        const id = docs.id;

        expect(id.length).toBeGreaterThanOrEqual(3);
      });

      it("min = -3. should throw an error", () => {
        const schema = chaca.schema({
          id: { type: () => modules.id.mongodbId(), isArray: { min: -3 } },
        });

        expect(() => schema.object()).toThrow(ChacaError);
      });

      it("min = 0. should return an array with length between 0 and 10", () => {
        const schema = chaca.schema({
          id: { type: () => modules.id.mongodbId(), isArray: { min: 0 } },
        });
        const docs = schema.object();
        const id = docs.id;

        expect(id.length).toBeGreaterThanOrEqual(0);
        expect(id.length).toBeLessThanOrEqual(10);
      });
    });

    describe("min and max argument", () => {
      it("isArray = {}. should return an array with length between 0 and 10", () => {
        const schema = chaca.schema({
          id: { type: () => modules.id.mongodbId(), isArray: {} },
        });
        const docs = schema.object();
        const id = docs.id;

        expect(id.length).toBeGreaterThanOrEqual(0);
        expect(id.length).toBeLessThanOrEqual(10);
      });

      it("min = 3 & max = 10. should return an array with length betwwen min and max parameters", () => {
        const schema = chaca.schema({
          id: {
            type: () => modules.id.uuid(),
            isArray: { min: 3, max: 10 },
          },
        });
        const docs = schema.object();
        const id = docs.id;

        expect(id.length >= 3 && id.length <= 10).toBe(true);
      });

      it("min = 0 & max = 0. should return an empty array", () => {
        const schema = chaca.schema({
          id: {
            type: () => modules.id.uuid(),
            isArray: { min: 0, max: 0 },
          },
        });
        const docs = schema.object();
        const id = docs.id;

        expect(id).toHaveLength(0);
      });

      it("min = 5 & max = 0. should return throw an error", () => {
        const schema = chaca.schema({
          id: {
            type: () => modules.id.uuid(),
            isArray: { min: 5, max: 0 },
          },
        });

        expect(() => schema.object()).toThrow(ChacaError);
      });
    });
  });

  describe("number definition", () => {
    it("isArray = 20. should return an array of documents with the id property with 20 values", () => {
      const schema = chaca.schema({
        id: { type: () => modules.id.uuid(), isArray: 20 },
      });

      const doc = schema.object();
      expect(doc.id).toHaveLength(20);
    });

    it("isArray = 0. should return an array with 0 elements", () => {
      const schema = chaca.schema({
        id: { type: () => modules.id.uuid(), isArray: 0 },
      });

      const doc = schema.object();
      expect(doc.id).toHaveLength(0);
    });

    it("isArray = -5. should throw an error", () => {
      const schema = chaca.schema({
        id: { type: () => modules.id.uuid(), isArray: -5 },
      });

      expect(() => schema.object()).toThrow(ChacaError);
    });
  });
});
