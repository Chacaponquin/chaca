import { ChacaError, chaca } from "../../../../src";
import { describe, expect, it } from "vitest";

describe("# Sequence field tests", () => {
  it("Simple sequence definition", () => {
    const schema = chaca.schema({
      test: chaca.sequence(),
    });

    const data = schema.array(5);
    expect(data.every((o, i) => o.test === i + 1)).toBe(true);
  });

  it("Object definition of simple sequence field", () => {
    const schema = chaca.schema({
      test: { type: chaca.sequence() },
    });

    const data = schema.array(5);

    expect(data.every((o, i) => o.test === i + 1)).toBe(true);
  });

  it("Create an array sequence field. Should throw an error", () => {
    expect(() =>
      chaca
        .schema({
          test: { type: chaca.sequence(), isArray: 20 },
        })
        .array(20),
    ).toThrow(ChacaError);
  });

  it("Object definition of possible null sequence field. At least one value should be null", () => {
    const schema = chaca.schema({
      test: { type: chaca.sequence(), possibleNull: 0.5 },
    });

    const data = schema.array(20);
    expect(data.some((o) => o.test === null)).toBe(true);
  });

  it("Create a sequence field as key field", () => {
    const schema = chaca.schema({
      test: chaca.key(chaca.sequence()),
    });

    const data = schema.array(5);
    console.log(data);
    expect(data.every((o, i) => o.test === i + 1)).toBe(true);
  });
});
