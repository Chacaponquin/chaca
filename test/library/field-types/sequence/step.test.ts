import { ChacaError, Schema, chaca } from "../../../../src";
import { describe, expect, it } from "vitest";

function valid(schema: Schema, step: number): boolean {
  const data = schema.array(10);

  let valid = true;
  let req = 1;
  for (let i = 0; i < data.length && valid; i++) {
    if (data[i].test !== req) {
      valid = false;
    }

    req += step;
  }

  return valid;
}

describe("# Sequence field setp config tests", () => {
  it("Define step=5", () => {
    const schema = chaca.schema({ test: chaca.sequence({ step: 5 }) });

    expect(valid(schema, 5)).toBe(true);
  });

  it("Define step=-1. Should throw an error", () => {
    expect(() =>
      chaca.schema({ test: chaca.sequence({ step: -1 }) }).array(20),
    ).toThrow(ChacaError);
  });

  it("Define step=0. Should throw an error", () => {
    expect(() =>
      chaca.schema({ test: chaca.sequence({ step: 0 }) }).array(20),
    ).toThrow(ChacaError);
  });

  it("Define step as no number argument. Should set step=1", () => {
    const schema = chaca.schema({ test: chaca.sequence({ step: "" as any }) });

    expect(valid(schema, 1)).toBe(true);
  });
});
