import { ChacaError, chaca } from "../../../../src";
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
  it("create a schema with a probability field without values. Should throw an error", () => {
    const schema = chaca.schema({
      prob: chaca.probability([]),
    });

    expect(() => schema.array(10)).toThrow(ChacaError);
  });

  it("create a schema with a probability field with 3 elements", () => {
    const schema = chaca.schema({
      prob: chaca.probability([
        { chance: 0.8, value: 10 },
        { chance: 0.1, value: 5 },
        { chance: 0.1, value: 1 },
      ]),
    });

    const data = schema.array(50);

    expect(count(data, 10)).toBeGreaterThanOrEqual(30);
  });

  it("probability field with function chance that returns 0.8", () => {
    const schema = chaca.schema({
      prob: chaca.probability([
        { chance: () => 0.8, value: 10 },
        { chance: 0.1, value: 5 },
        { chance: 0.1, value: 1 },
      ]),
    });

    const data = schema.array(50);

    const total = count(data, 10);

    expect(total).toBeGreaterThanOrEqual(30);
  });

  it("probability field with 2 elements with 0.8 chance", () => {
    const schema = chaca.schema({
      prob: chaca.probability([
        { chance: 0.8, value: 10 },
        { chance: 0.8, value: 5 },
        { chance: 0.1, value: 1 },
      ]),
    });

    const data = schema.array(100);
    const result = Math.abs(count(data, 10) - count(data, 5));

    expect(result).toBeLessThanOrEqual(20);
  });

  it("probability field with an option with chance=0. should never return that value", () => {
    const schema = chaca.schema({
      prob: chaca.probability([
        { chance: 0, value: 10 },
        { chance: 0.3, value: 5 },
        { chance: 0.2, value: 1 },
      ]),
    });

    const data = schema.array(100);

    expect(count(data, 10)).toBe(0);
  });

  it("probability field with 3 options with different chances", () => {
    const schema = chaca.schema({
      prob: chaca.probability([
        { chance: 0.9, value: 10 },
        { chance: 0.3, value: 5 },
        { chance: 0.05, value: 1 },
      ]),
    });

    const data = schema.array(1000);
    const result1 = count(data, 10);
    const result2 = count(data, 5);
    const result3 = count(data, 1);

    expect(result1).toBeGreaterThan(result2);
    expect(result2).toBeGreaterThan(result3);
  });
});
