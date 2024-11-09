import { ChacaError, chaca } from "../../../../src";
import { describe, expect, it } from "vitest";

describe("Key field", () => {
  describe("invalid data", () => {
    it("return null. should throw an error", () => {
      expect(() => {
        chaca.schema({ key: chaca.key(() => null) }).array(50);
      }).toThrow(ChacaError);
    });

    it("return undefined. should throw an error", () => {
      expect(() => {
        chaca.schema({ key: chaca.key(() => undefined) }).array(50);
      }).toThrow(ChacaError);
    });
  });

  describe("define isArray", () => {
    it("define an array key field. should throw an error", () => {
      expect(() => {
        chaca
          .schema({
            key: { type: chaca.key(chaca.sequence()), isArray: 20 },
          })
          .array(50);
      }).toThrow(ChacaError);
    });
  });

  describe("define possibleNull", () => {
    it("possibleNull = 0.1. should throw an error", () => {
      expect(() =>
        chaca
          .schema({
            test: { type: chaca.key(chaca.sequence()), possibleNull: 0.1 },
          })
          .array(50),
      ).toThrow(ChacaError);
    });

    it("possibleNull = 0. should not throw an error", () => {
      expect(() =>
        chaca
          .schema({
            test: { type: chaca.key(chaca.sequence()), possibleNull: 0 },
          })
          .array(50),
      ).not.toThrow(ChacaError);
    });
  });
});
