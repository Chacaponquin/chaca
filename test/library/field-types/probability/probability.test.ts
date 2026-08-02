import { WrongProbabilityFieldDefinitionError, chaca } from "../../../../src";
import { describe, expect, it } from "vitest";

function count(data: any[], value: number): number {
  let count = 0;
  for (const dat of data) {
    if (dat.prob === value) {
      count++;
    }
  }

  return count;
}

describe("Probability field", () => {
  it("create a schema with a probability field without values. Should throw an error", async () => {
    const schema = chaca.schema({
      prob: chaca.probability([]),
    });

    await expect(schema.array(10)).rejects.toThrow(
      WrongProbabilityFieldDefinitionError,
    );
  });

  it("all options with chance = 0. Should throw an error", async () => {
    const schema = chaca.schema({
      prob: chaca.probability([
        { chance: 0, value: 10 },
        { chance: 0, value: 5 },
      ]),
    });

    await expect(schema.object()).rejects.toThrow(
      WrongProbabilityFieldDefinitionError,
    );
  });

  it("option with chance greater than 1. Should throw an error", async () => {
    const schema = chaca.schema({
      prob: chaca.probability([{ chance: 1.5, value: 10 }]),
    });

    await expect(schema.object()).rejects.toThrow(
      WrongProbabilityFieldDefinitionError,
    );
  });

  it("option with negative chance. Should throw an error", async () => {
    const schema = chaca.schema({
      prob: chaca.probability([
        { chance: -0.5, value: 10 },
        { chance: 0.5, value: 5 },
      ]),
    });

    await expect(schema.object()).rejects.toThrow(
      WrongProbabilityFieldDefinitionError,
    );
  });

  it("option with a not number or function chance. Should throw an error", async () => {
    const schema = chaca.schema({
      prob: chaca.probability([{ chance: "0.5" as any, value: 10 }]),
    });

    await expect(schema.object()).rejects.toThrow(
      WrongProbabilityFieldDefinitionError,
    );
  });

  it("option that is not an object. Should throw an error", async () => {
    const schema = chaca.schema({
      prob: chaca.probability([null as any]),
    });

    await expect(schema.object()).rejects.toThrow(
      WrongProbabilityFieldDefinitionError,
    );
  });

  it("chance function that returns a not number value. Should throw an error", async () => {
    const schema = chaca.schema({
      prob: chaca.probability([{ chance: () => "0.5" as any, value: 10 }]),
    });

    await expect(schema.object()).rejects.toThrow(
      WrongProbabilityFieldDefinitionError,
    );
  });

  it("create a schema with a probability field with 3 elements", async () => {
    const schema = chaca.schema({
      prob: chaca.probability([
        { chance: 0.8, value: 10 },
        { chance: 0.1, value: 5 },
        { chance: 0.1, value: 1 },
      ]),
    });

    const data = await schema.array(50);

    // every generated value belongs to the declared value set
    for (const doc of data) {
      expect([10, 5, 1]).toContain(doc.prob);
    }

    expect(count(data, 10)).toBeGreaterThanOrEqual(30);
  });

  it("probability field with function chance that returns 0.8", async () => {
    const schema = chaca.schema({
      prob: chaca.probability([
        { chance: () => 0.8, value: 10 },
        { chance: 0.1, value: 5 },
        { chance: 0.1, value: 1 },
      ]),
    });

    const data = await schema.array(50);

    for (const doc of data) {
      expect([10, 5, 1]).toContain(doc.prob);
    }

    expect(count(data, 10)).toBeGreaterThanOrEqual(30);
  });

  it("probability field with an only option with chance=1. Should always return that value", async () => {
    const schema = chaca.schema({
      prob: chaca.probability([{ chance: 1, value: 10 }]),
    });

    const data = await schema.array(20);

    expect(data.every((d) => d.prob === 10)).toBe(true);
  });

  it("probability field with 2 elements with 0.8 chance", async () => {
    const schema = chaca.schema({
      prob: chaca.probability([
        { chance: 0.8, value: 10 },
        { chance: 0.8, value: 5 },
        { chance: 0.1, value: 1 },
      ]),
    });

    const data = await schema.array(100);
    const result = Math.abs(count(data, 10) - count(data, 5));

    expect(result).toBeLessThanOrEqual(40);
  });

  it("probability field with an option with chance=0. should never return that value", async () => {
    const schema = chaca.schema({
      prob: chaca.probability([
        { chance: 0, value: 10 },
        { chance: 0.3, value: 5 },
        { chance: 0.2, value: 1 },
      ]),
    });

    const data = await schema.array(100);

    expect(count(data, 10)).toBe(0);
  });

  it("probability field with 3 options with different chances", async () => {
    const schema = chaca.schema({
      prob: chaca.probability([
        { chance: 0.9, value: 10 },
        { chance: 0.3, value: 5 },
        { chance: 0.05, value: 1 },
      ]),
    });

    const data = await schema.array(1000);
    const result1 = count(data, 10);
    const result2 = count(data, 5);
    const result3 = count(data, 1);

    expect(result1).toBeGreaterThan(result2);
    expect(result2).toBeGreaterThan(result3);
  });
});
