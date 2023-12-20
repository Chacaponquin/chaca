import { ChacaError } from "../../../src";
import { COMPLETE_SCHEMA } from "../../utils/schemas/schema-complete";

const MAXIMUN_FOR_TEST = 100000;

describe("# Limit Docs Generated Test", () => {
  it("Pass a not number values as a number to generate. Should throw an error", () => {
    expect(() => COMPLETE_SCHEMA.generate("" as any)).toThrowError(ChacaError);
  });

  it("Pass a negative number as a number to generate. Should throw an error", () => {
    expect(() => COMPLETE_SCHEMA.generate(-10)).toThrowError(ChacaError);
  });

  for (let i = 0; i <= MAXIMUN_FOR_TEST; i += 5000) {
    it(`${i} documents`, () => {
      const cantDoc = i;
      expect(COMPLETE_SCHEMA.generate(cantDoc).length).toBe(cantDoc);
    });
  }
});
