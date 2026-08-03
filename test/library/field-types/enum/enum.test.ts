import { EmptyEnumValuesError, chaca } from "../../../../src";
import { describe, expect, it } from "vitest";

describe("Enum field", () => {
  it("values = []. should throw an error", async () => {
    const schema = chaca.schema({ enum: chaca.enum([]) });

    await expect(schema.array(5)).rejects.toThrow(EmptyEnumValuesError);
  });

  it("values is not an array. should throw an error", async () => {
    const schema = chaca.schema({ enum: chaca.enum("hello" as any) });

    await expect(schema.object()).rejects.toThrow(EmptyEnumValuesError);
  });

  it("values = ['only']. should always return that value", async () => {
    const schema = chaca.schema({ enum: chaca.enum(["only"]) });

    const data = await schema.array(5);

    expect(data.every((d) => d.enum === "only")).toBe(true);
  });

  it("values = [1, 2, 3, 4, 5]. should return one of this elements", async () => {
    const array = [1, 2, 3, 4, 5];
    const schema = chaca.schema({
      enum: chaca.enum(array),
    });

    const doc = await schema.object();

    expect(array).include(doc.enum);
  });

  it("values = [1, 2, 3, 4, 5]. every generated document takes its value from the array", async () => {
    const array = [1, 2, 3, 4, 5];
    const schema = chaca.schema({
      enum: chaca.enum(array),
    });

    const data = await schema.array(30);

    expect(data).toHaveLength(30);

    for (const doc of data) {
      expect(array).include(doc.enum);
    }
  });

  describe("array enum", () => {
    it("values = [1, 2, 3, 4, 5] & isArray = 5. should return an array with 5 values", async () => {
      const array = [1, 2, 3, 4, 5];
      const schema = chaca.schema({
        enum: { type: chaca.enum(array), isArray: 5 },
      });

      const doc = await schema.object();

      expect(doc.enum).toHaveLength(5);

      for (const value of doc.enum) {
        expect(array).include(value);
      }
    });
  });
});
