import { EmptyEnumValuesError, chaca } from "../../../../src";
import { describe, expect, it } from "vitest";

describe("Enum field", () => {
  it("values = []. should throw an error", () => {
    expect(() => {
      chaca.schema({ enum: chaca.enum([]) }).array(5);
    }).toThrow(EmptyEnumValuesError);
  });

  it("values = [1, 2, 3, 4, 5]. should return one of this elements", () => {
    const array = [1, 2, 3, 4, 5];
    const schema = chaca.schema({
      enum: chaca.enum(array),
    });

    const doc = schema.object();

    expect(array).include(doc.enum);
  });

  describe("array enum", () => {
    it("values = [1, 2, 3, 4, 5] & isArray = 5. should return an array with 5 values", () => {
      const array = [1, 2, 3, 4, 5];
      const schema = chaca.schema({
        enum: { type: chaca.enum(array), isArray: 5 },
      });

      const doc = schema.object();

      expect(doc.enum).toHaveLength(5);

      for (const value of doc.enum) {
        expect(array).include(value);
      }
    });
  });
});
