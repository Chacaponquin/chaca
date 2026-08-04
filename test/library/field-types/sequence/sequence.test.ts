import { ChacaError, chaca } from "../../../../src";
import { describe, expect, it } from "vitest";

describe("# Sequence field tests", () => {
  it("Simple sequence definition", async () => {
    const schema = chaca.schema({
      test: chaca.sequence(),
    });

    const data = await schema.array(5);

    expect(data.every((o, i) => o.test === i + 1)).toBe(true);
  });

  it("Object definition of simple sequence field", async () => {
    const schema = chaca.schema({
      test: { type: chaca.sequence() },
    });

    const data = await schema.array(5);

    expect(data.every((o, i) => o.test === i + 1)).toBe(true);
  });

  it("Create an array sequence field. Should throw an error", async () => {
    const schema = chaca.schema({
      test: { type: chaca.sequence(), isArray: 20 },
    });

    await expect(schema.array(20)).rejects.toThrow(ChacaError);
  });

  it("Define starsWith = 10. Values should be [10, 11, 12, 13, 14]", async () => {
    const schema = chaca.schema({
      test: chaca.sequence({ starsWith: 10 }),
    });

    const data = await schema.array(5);

    expect(data.map((o) => o.test)).toEqual([10, 11, 12, 13, 14]);
  });

  it("Define starsWith = 5 & step = 5. Values should be [5, 10, 15, 20]", async () => {
    const schema = chaca.schema({
      test: chaca.sequence({ starsWith: 5, step: 5 }),
    });

    const data = await schema.array(4);

    expect(data.map((o) => o.test)).toEqual([5, 10, 15, 20]);
  });

  it("Define startsWith = 10. Values should be [10, 11, 12, 13, 14]", async () => {
    const schema = chaca.schema({
      test: chaca.sequence({ startsWith: 10 }),
    });

    const data = await schema.array(5);

    expect(data.map((o) => o.test)).toEqual([10, 11, 12, 13, 14]);
  });

  it("Define startsWith and deprecated starsWith. startsWith should win", async () => {
    const schema = chaca.schema({
      test: chaca.sequence({ startsWith: 10, starsWith: 100 }),
    });

    const data = await schema.array(3);

    expect(data.map((o) => o.test)).toEqual([10, 11, 12]);
  });

  it("Define starsWith as no number argument. Should start at 1", async () => {
    const schema = chaca.schema({
      test: chaca.sequence({ starsWith: "" as any }),
    });

    const data = await schema.array(3);

    expect(data.map((o) => o.test)).toEqual([1, 2, 3]);
  });

  it("Object definition of possible null sequence field. At least one value should be null", async () => {
    const schema = chaca.schema({
      test: { type: chaca.sequence(), possibleNull: 0.5 },
    });

    const data = await schema.array(20);
    expect(data.some((o) => o.test === null)).toBe(true);
  });

  it("Create a sequence field as key field", async () => {
    const schema = chaca.schema({
      test: chaca.key(chaca.sequence()),
    });

    const data = await schema.array(5);

    expect(data.every((o, i) => o.test === i + 1)).toBe(true);
  });
});
