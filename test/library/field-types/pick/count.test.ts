import { describe, expect, it } from "vitest";
import { chaca, PickFieldDefinitionError } from "../../../../src";

describe("pick count argument", () => {
  describe("object definition", () => {
    it("values = [1, 2, 3] & count = empty object. should return an array with length between 0 and 3", async () => {
      const schema = chaca.schema({
        pick: chaca.pick({ values: [1, 2, 3], count: {} }),
      });

      const result = await schema.object();

      expect(result.pick.length).toBeLessThanOrEqual(3);
      expect(result.pick.length).toBeGreaterThanOrEqual(0);
    });

    describe("count.min and count.max", () => {
      it("values = [1, 2, 3] & count.min = 1 & count.max = 3. should return an array with length between 1 and 3", async () => {
        const schema = chaca.schema({
          pick: chaca.pick({ values: [1, 2, 3], count: { min: 1, max: 3 } }),
        });

        const result = await schema.object();

        expect(result.pick.length).toBeGreaterThanOrEqual(1);
        expect(result.pick.length).toBeLessThanOrEqual(3);
      });

      it("values = [1, 2, 3] & count.min = 1 & count.max = 3. count.max should be reachable", async () => {
        const schema = chaca.schema({
          pick: chaca.pick({ values: [1, 2, 3], count: { min: 1, max: 3 } }),
        });

        const found = new Set<number>();

        for (let i = 0; i < 200 && found.size < 3; i++) {
          const result = await schema.object();
          found.add(result.pick.length);
        }

        expect([...found].sort()).toEqual([1, 2, 3]);
      });

      it("values = [1, 2, 3] & count.min = 3 & count.max = 3. should return an array with length 3", async () => {
        const schema = chaca.schema({
          pick: chaca.pick({ values: [1, 2, 3], count: { min: 3, max: 3 } }),
        });

        const result = await schema.object();

        expect(result.pick).toHaveLength(3);
      });

      it("values = [1, 2, 3] & count.min = 0 & count.max = 0. should return an array with length 0", async () => {
        const schema = chaca.schema({
          pick: chaca.pick({ values: [1, 2, 3], count: { min: 0, max: 0 } }),
        });

        const result = await schema.object();

        expect(result.pick).toHaveLength(0);
      });

      it("values = [1, 2, 3] & count.min = 3 & count.max = 1. should throw an error", async () => {
        const schema = chaca.schema({
          pick: chaca.pick({
            values: [1, 2, 3],
            count: { min: 3, max: 1 },
          }),
        });

        await expect(schema.object()).rejects.toThrow(PickFieldDefinitionError);
      });
    });

    describe("count.max", () => {
      it("values = [1, 2, 3] & count.max = 4. should throw an error", async () => {
        const schema = chaca.schema({
          pick: chaca.pick({ values: [1, 2, 3], count: { max: 4 } }),
        });

        await expect(schema.object()).rejects.toThrow(PickFieldDefinitionError);
      });

      it("values = [1, 2, 3] & count.max = 2. should return an array with length less or equal than 2", async () => {
        const schema = chaca.schema({
          pick: chaca.pick({ values: [1, 2, 3], count: { max: 2 } }),
        });

        const result = await schema.object();

        expect(result.pick.length).toBeLessThanOrEqual(2);
      });

      it("values = [1, 2, 3] & count.max = -1. should throw an error", async () => {
        const schema = chaca.schema({
          pick: chaca.pick({ values: [1, 2, 3], count: { max: -1 } }),
        });

        await expect(schema.object()).rejects.toThrow(PickFieldDefinitionError);
      });
    });

    describe("count.min", () => {
      it("values = [1, 2, 3] & count.min = 0. should return an array with length greater than 0", async () => {
        const schema = chaca.schema({
          pick: chaca.pick({ values: [1, 2, 3], count: { min: 0 } }),
        });

        const result = await schema.object();

        expect(result.pick.length).toBeGreaterThanOrEqual(0);
      });

      it("values = [1, 2, 3] & count.min = 3. should return an array with length 3", async () => {
        const schema = chaca.schema({
          pick: chaca.pick({ values: [1, 2, 3], count: { min: 3 } }),
        });

        const result = await schema.object();

        expect(result.pick).toHaveLength(3);
      });

      it("values = [1, 2, 3] & count.min = 4. should throw an error", async () => {
        const schema = chaca.schema({
          pick: chaca.pick({ values: [1, 2, 3], count: { min: 4 } }),
        });

        await expect(schema.object()).rejects.toThrow(PickFieldDefinitionError);
      });

      it("values = [1, 2, 3] & count.min = 1. should return an array with length greater than 1", async () => {
        const schema = chaca.schema({
          pick: chaca.pick({ values: [1, 2, 3], count: { min: 1 } }),
        });

        const result = await schema.object();

        expect(result.pick.length).toBeGreaterThanOrEqual(1);
      });

      it("values = [1, 2, 3] & count.min = -1. should throw an error", async () => {
        const schema = chaca.schema({
          pick: chaca.pick({ values: [1, 2, 3], count: { min: -1 } }),
        });

        await expect(schema.object()).rejects.toThrow(PickFieldDefinitionError);
      });
    });
  });

  describe("wrong count type definition", () => {
    it("count = string. should throw an error", async () => {
      const schema = chaca.schema({
        pick: chaca.pick({ values: [1, 2, 3], count: "2" as any }),
      });

      await expect(schema.object()).rejects.toThrow(PickFieldDefinitionError);
    });

    it("count = null. should throw an error", async () => {
      const schema = chaca.schema({
        pick: chaca.pick({ values: [1, 2, 3], count: null as any }),
      });

      await expect(schema.object()).rejects.toThrow(PickFieldDefinitionError);
    });
  });

  describe("function definition", () => {
    it("declare a function that returns 0. should return an empty array", async () => {
      const schema = chaca.schema({
        pick: chaca.pick({ values: [1, 2, 3, 4, 5], count: () => 0 }),
      });

      const result = await schema.object();

      expect(result.pick).toEqual([]);
    });

    it("declare function that return -1. should throw an error", async () => {
      const schema = chaca.schema({
        pick: chaca.pick({ values: [1, 2, 3], count: () => -1 }),
      });

      await expect(schema.object()).rejects.toThrow(PickFieldDefinitionError);
    });

    it("values = [1, 2, 3, 4, 5] & count = function that returns 6. should throw an error", async () => {
      const schema = chaca.schema({
        pick: chaca.pick({ values: [1, 2, 3, 4, 5], count: () => 6 }),
      });

      await expect(schema.object()).rejects.toThrow(PickFieldDefinitionError);
    });

    it("count = function that returns a not number or object value. should throw an error", async () => {
      const schema = chaca.schema({
        pick: chaca.pick({ values: [1, 2, 3], count: () => "2" as any }),
      });

      await expect(schema.object()).rejects.toThrow(PickFieldDefinitionError);
    });

    it("count = function that returns { min: 1, max: 3 }. should return an array with length between 1 and 3", async () => {
      const values = [1, 2, 3];
      const schema = chaca.schema({
        pick: chaca.pick({ values: values, count: () => ({ min: 1, max: 3 }) }),
      });

      const result = await schema.object();

      expect(result.pick.length).toBeGreaterThanOrEqual(1);
      expect(result.pick.length).toBeLessThanOrEqual(3);

      for (const value of result.pick) {
        expect(values).toContain(value);
      }
    });

    it("count = async function that returns 2. should return a two elements array", async () => {
      const schema = chaca.schema({
        pick: chaca.pick({
          values: [1, 2, 3],
          count: () => Promise.resolve(2),
        }),
      });

      const result = await schema.object();

      expect(result.pick).toHaveLength(2);
    });

    it("values = [1, 2, 3, 4, 5] & count = 5. should return an array that includes 1, 2, 3, 4, 5", async () => {
      const schema = chaca.schema({
        pick: chaca.pick({ values: [1, 2, 3, 4, 5], count: () => 5 }),
      });

      const result = await schema.object();

      expect(result.pick).toHaveLength(5);
      expect(result.pick).include(1);
      expect(result.pick).include(2);
      expect(result.pick).include(3);
      expect(result.pick).include(4);
      expect(result.pick).include(5);
    });
  });
});
