import { describe, expect, it } from "vitest";
import { chaca, modules } from "../../../src";

describe("possibleNull and isArray interaction", () => {
  it("possibleNull = true & isArray = 10. the whole field should be null, not an array of nulls", async () => {
    const schema = chaca.schema({
      values: {
        type: () => modules.id.uuid(),
        possibleNull: true,
        isArray: 10,
      },
    });

    const doc = await schema.object();

    expect(doc.values).toBeNull();
  });

  it("possibleNull = false & isArray = 10. should return an array with 10 elements", async () => {
    const schema = chaca.schema({
      values: {
        type: () => modules.id.uuid(),
        possibleNull: false,
        isArray: 10,
      },
    });

    const doc = await schema.object();

    expect(doc.values).toHaveLength(10);
  });

  describe("possibleNull applies to the field, never to the array elements", () => {
    /**
     * Every document must be either `null` or a complete array. A `null` must
     * never appear inside the array, no matter which `possibleNull` form is
     * used, because `possibleNull` describes the field and not its elements.
     */
    function expectNullOrFullArray(values: unknown[], length: number) {
      let nullFields = 0;
      let arrays = 0;

      for (const v of values) {
        if (v === null) {
          nullFields++;
        } else {
          arrays++;

          expect(Array.isArray(v)).toBe(true);
          expect(v).toHaveLength(length);
          expect((v as unknown[]).every((e) => e !== null)).toBe(true);
        }
      }

      return { nullFields, arrays };
    }

    it("possibleNull as a float probability. documents are either null or a full array, with no null inside", async () => {
      const schema = chaca.schema({
        values: {
          type: () => modules.id.uuid(),
          possibleNull: 0.5,
          isArray: 10,
        },
      });

      const data = await schema.array(200);

      const { nullFields, arrays } = expectNullOrFullArray(
        data.map((d: { values: unknown }) => d.values),
        10,
      );

      // with 200 documents and a 0.5 probability both branches must show up
      expect(nullFields).toBeGreaterThan(0);
      expect(arrays).toBeGreaterThan(0);
    });

    it("possibleNull as a function returning a probability. no null inside the array", async () => {
      const schema = chaca.schema({
        values: {
          type: () => modules.id.uuid(),
          possibleNull: () => 0.5,
          isArray: 10,
        },
      });

      const data = await schema.array(200);

      const { nullFields, arrays } = expectNullOrFullArray(
        data.map((d: { values: unknown }) => d.values),
        10,
      );

      expect(nullFields).toBeGreaterThan(0);
      expect(arrays).toBeGreaterThan(0);
    });

    it("possibleNull as an exact count. the given number of documents is null and the rest are full arrays", async () => {
      const schema = chaca.schema({
        values: {
          type: () => modules.id.uuid(),
          possibleNull: 20,
          isArray: 10,
        },
      });

      const data = await schema.array(50);

      const { nullFields, arrays } = expectNullOrFullArray(
        data.map((d: { values: unknown }) => d.values),
        10,
      );

      expect(nullFields).toBe(20);
      expect(arrays).toBe(30);
    });

    it("applies to every field type, not only to custom fields", async () => {
      const schema = chaca.schema({
        enumField: {
          type: chaca.enum(["a", "b", "c"]),
          possibleNull: 0.5,
          isArray: 8,
        },
        pickField: {
          type: chaca.pick({ values: [1, 2, 3, 4, 5], count: 2 }),
          possibleNull: 0.5,
          isArray: 8,
        },
        objectField: {
          type: chaca.schema({ n: () => modules.id.uuid() }),
          possibleNull: 0.5,
          isArray: 8,
        },
      });

      const data = await schema.array(100);

      for (const key of ["enumField", "pickField", "objectField"]) {
        expectNullOrFullArray(
          data.map((d: Record<string, unknown>) => d[key]),
          8,
        );
      }
    });
  });
});
