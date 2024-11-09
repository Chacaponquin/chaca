import { describe, expect, it } from "vitest";
import { chaca, PickFieldDefinitionError } from "../../../../src";

describe("pick count argument", () => {
  describe("object definition", () => {
    it("values = [1, 2, 3] & count = empty object. should return an array with length between 0 and 3", () => {
      const schema = chaca.schema({
        pick: chaca.pick({ values: [1, 2, 3], count: {} }),
      });

      const result = schema.object();

      expect(result.pick.length).toBeLessThanOrEqual(3);
      expect(result.pick.length).toBeGreaterThanOrEqual(0);
    });

    describe("count.min and count.max", () => {
      it("values = [1, 2, 3] & count.min = 1 & count.max = 3. should return an array with length between 1 and 3", () => {
        const schema = chaca.schema({
          pick: chaca.pick({ values: [1, 2, 3], count: { min: 1, max: 3 } }),
        });

        const result = schema.object();

        expect(result.pick.length).toBeGreaterThanOrEqual(1);
        expect(result.pick.length).toBeLessThanOrEqual(3);
      });

      it("values = [1, 2, 3] & count.min = 3 & count.max = 3. should return an array with length 3", () => {
        const schema = chaca.schema({
          pick: chaca.pick({ values: [1, 2, 3], count: { min: 3, max: 3 } }),
        });

        const result = schema.object();

        expect(result.pick).toHaveLength(3);
      });

      it("values = [1, 2, 3] & count.min = 0 & count.max = 0. should return an array with length 0", () => {
        const schema = chaca.schema({
          pick: chaca.pick({ values: [1, 2, 3], count: { min: 0, max: 0 } }),
        });

        const result = schema.object();

        expect(result.pick).toHaveLength(0);
      });

      it("values = [1, 2, 3] & count.min = 3 & count.max = 1. should throw an error", () => {
        const schema = chaca.schema({
          pick: chaca.pick({
            values: [1, 2, 3],
            count: { min: 3, max: 1 },
          }),
        });

        expect(() => schema.object()).toThrow(PickFieldDefinitionError);
      });
    });

    describe("count.max", () => {
      it("values = [1, 2, 3] & count.max = 4. should throw an error", () => {
        const schema = chaca.schema({
          pick: chaca.pick({ values: [1, 2, 3], count: { max: 4 } }),
        });

        expect(() => schema.object()).toThrow(PickFieldDefinitionError);
      });

      it("values = [1, 2, 3] & count.max = 2. should return an array with length less or equal than 2", () => {
        const schema = chaca.schema({
          pick: chaca.pick({ values: [1, 2, 3], count: { max: 2 } }),
        });

        const result = schema.object();

        expect(result.pick.length).toBeLessThanOrEqual(2);
      });

      it("values = [1, 2, 3] & count.max = -1. should throw an error", () => {
        const schema = chaca.schema({
          pick: chaca.pick({ values: [1, 2, 3], count: { max: -1 } }),
        });

        expect(() => schema.object()).toThrow(PickFieldDefinitionError);
      });
    });

    describe("count.min", () => {
      it("values = [1, 2, 3] & count.min = 0. should return an array with length greater than 0", () => {
        const schema = chaca.schema({
          pick: chaca.pick({ values: [1, 2, 3], count: { min: 0 } }),
        });

        const result = schema.object();

        expect(result.pick.length).toBeGreaterThanOrEqual(0);
      });

      it("values = [1, 2, 3] & count.min = 3. should return an array with length 3", () => {
        const schema = chaca.schema({
          pick: chaca.pick({ values: [1, 2, 3], count: { min: 3 } }),
        });

        const result = schema.object();

        expect(result.pick).toHaveLength(3);
      });

      it("values = [1, 2, 3] & count.min = 4. should throw an error", () => {
        const schema = chaca.schema({
          pick: chaca.pick({ values: [1, 2, 3], count: { min: 4 } }),
        });

        expect(() => schema.object()).toThrow(PickFieldDefinitionError);
      });

      it("values = [1, 2, 3] & count.min = 1. should return an array with length greater than 1", () => {
        const schema = chaca.schema({
          pick: chaca.pick({ values: [1, 2, 3], count: { min: 1 } }),
        });

        const result = schema.object();

        expect(result.pick.length).toBeGreaterThanOrEqual(1);
      });

      it("values = [1, 2, 3] & count.min = -1. should throw an error", () => {
        const schema = chaca.schema({
          pick: chaca.pick({ values: [1, 2, 3], count: { min: -1 } }),
        });

        expect(() => schema.object()).toThrow(PickFieldDefinitionError);
      });
    });
  });

  describe("function definition", () => {
    it("declare a function that returns 0. should return an empty array", () => {
      const schema = chaca.schema({
        pick: chaca.pick({ values: [1, 2, 3, 4, 5], count: () => 0 }),
      });

      const result = schema.object();

      expect(result.pick).toEqual([]);
    });

    it("declare function that return -1. should throw an error", () => {
      const schema = chaca.schema({
        pick: chaca.pick({ values: [1, 2, 3], count: () => -1 }),
      });

      expect(() => schema.object()).toThrow(PickFieldDefinitionError);
    });

    it("values = [1, 2, 3, 4, 5] & count = function that returns 6. should throw an error", () => {
      const schema = chaca.schema({
        pick: chaca.pick({ values: [1, 2, 3, 4, 5], count: () => 6 }),
      });

      expect(() => schema.object()).toThrow(PickFieldDefinitionError);
    });

    it("values = [1, 2, 3, 4, 5] & count = 5. should return an array that includes 1, 2, 3, 4, 5", () => {
      const schema = chaca.schema({
        pick: chaca.pick({ values: [1, 2, 3, 4, 5], count: () => 5 }),
      });

      const result = schema.object();

      expect(result.pick).toHaveLength(5);
      expect(result.pick).include(1);
      expect(result.pick).include(2);
      expect(result.pick).include(3);
      expect(result.pick).include(4);
      expect(result.pick).include(5);
    });
  });
});
