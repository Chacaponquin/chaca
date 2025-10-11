import { describe, expect, it } from "vitest";
import { chaca, ChacaError, modules } from "../../../../src";

describe("Is array object definition", () => {
  describe("max argument", () => {
    it("max = 10. should return an array with length <= max parameter", async () => {
      const schema = chaca.schema({
        id: { type: () => modules.id.uuid(), isArray: { max: 10 } },
      });
      const docs = await schema.object();
      const id = docs.id;

      expect(id.length).toBeLessThanOrEqual(10);
    });

    it("max = -10. should throw an error", () => {
      const schema = chaca.schema({
        id: { type: () => modules.id.uuid(), isArray: { max: -10 } },
      });

      expect(() => schema.object()).rejects.toThrow(ChacaError);
    });

    it("max = 0. should return an empty array", async () => {
      const schema = chaca.schema({
        id: { type: () => modules.id.uuid(), isArray: { max: 0 } },
      });
      const docs = await schema.object();
      const id = docs.id;

      expect(id).toHaveLength(0);
    });
  });

  describe("min argument", () => {
    it("min = 3. should return an array with length >= min parameter", async () => {
      const schema = chaca.schema({
        id: { type: () => modules.id.uuid(), isArray: { min: 3 } },
      });
      const docs = await schema.object();
      const id = docs.id;

      expect(id.length).toBeGreaterThanOrEqual(3);
    });

    it("min = -3. should throw an error", () => {
      const schema = chaca.schema({
        id: { type: () => modules.id.uuid(), isArray: { min: -3 } },
      });

      expect(() => schema.object()).rejects.toThrow(ChacaError);
    });

    it("min = 0. should return an array with length between 0 and 10", async () => {
      const schema = chaca.schema({
        id: { type: () => modules.id.uuid(), isArray: { min: 0 } },
      });
      const docs = await schema.object();
      const id = docs.id;

      expect(id.length).toBeGreaterThanOrEqual(0);
      expect(id.length).toBeLessThanOrEqual(10);
    });
  });

  describe("min and max argument", () => {
    it("isArray = {}. should return an array with length between 0 and 10", async () => {
      const schema = chaca.schema({
        id: { type: () => modules.id.uuid(), isArray: {} },
      });
      const docs = await schema.object();
      const id = docs.id;

      expect(id.length).toBeGreaterThanOrEqual(0);
      expect(id.length).toBeLessThanOrEqual(10);
    });

    it("min = 3 & max = 10. should return an array with length betwwen min and max parameters", async () => {
      const schema = chaca.schema({
        id: {
          type: () => modules.id.uuid(),
          isArray: { min: 3, max: 10 },
        },
      });
      const docs = await schema.object();
      const id = docs.id;

      expect(id.length >= 3 && id.length <= 10).toBe(true);
    });

    it("min = 0 & max = 0. should return an empty array", async () => {
      const schema = chaca.schema({
        id: {
          type: () => modules.id.uuid(),
          isArray: { min: 0, max: 0 },
        },
      });
      const docs = await schema.object();
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

      expect(() => schema.object()).rejects.toThrow(ChacaError);
    });
  });
});
