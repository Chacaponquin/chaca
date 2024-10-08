import { ChacaError, chaca } from "../../../../src";
import { describe, expect, it } from "vitest";

describe("# Key fields tests", () => {
  it("Define an array key field. Should throw an error", () => {
    expect(() =>
      chaca
        .schema({
          test: { type: chaca.key(chaca.sequence()), isArray: 20 },
        })
        .array(50),
    ).toThrow(ChacaError);
  });

  it("Define an possible null key field. Should throw an error", () => {
    expect(() =>
      chaca
        .schema({
          test: { type: chaca.key(chaca.sequence()), possibleNull: 10 },
        })
        .array(50),
    ).toThrow(ChacaError);
  });
});
