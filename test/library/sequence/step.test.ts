import { ChacaError, ChacaSchema, chaca } from "../../../src";

function valid(schema: ChacaSchema, step: number): boolean {
  const data = schema.generate(10);

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
    expect(() => chaca.schema({ test: chaca.sequence({ step: -1 }) })).toThrow(
      ChacaError,
    );
  });

  it("Define step=0. Should throw an error", () => {
    expect(() => chaca.schema({ test: chaca.sequence({ step: 0 }) })).toThrow(
      ChacaError,
    );
  });

  it("Define step as no number argument. Should throw an error", () => {
    expect(() =>
      chaca.schema({ test: chaca.sequence({ step: "" as any }) }),
    ).toThrow(ChacaError);
  });
});
