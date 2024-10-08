import { EmptyEnumValuesError, chaca } from "../../../../src";
import { describe, expect, it } from "vitest";

describe("# Enum field tests", () => {
  it("With empty array as argument. Should throw an error", () => {
    expect(() => {
      chaca.schema({ id: chaca.enum([]) }).array(5);
    }).toThrow(EmptyEnumValuesError);
  });

  it("With an array [1, 2, 3, 4, 5]. Should return one of this elements", () => {
    const array = [1, 2, 3, 4, 5];
    const schema = chaca.schema({
      id: chaca.enum(array),
    });

    const docs = schema.object();

    expect(array.some((el) => el === docs.id)).toBe(true);
  });
});
