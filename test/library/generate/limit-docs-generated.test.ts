import { ChacaError } from "../../../src";
import { COMPLETE_SCHEMA } from "../../utils/schemas/schema-complete";
import { describe, expect, it } from "vitest";

const MAXIMUN_FOR_TEST = 100000;

describe("# Limit Docs Generated Test", () => {
  it("Pass a not number values as a number to generate. Should throw an error", () => {
    expect(() => COMPLETE_SCHEMA.array("" as any)).toThrow(ChacaError);
  });

  it("Pass a negative number as a number to generate. Should throw an error", () => {
    expect(() => COMPLETE_SCHEMA.array(-10)).toThrow(ChacaError);
  });

  for (let i = 0; i <= MAXIMUN_FOR_TEST; i += 5000) {
    it(`${i} documents`, () => {
      const cantDoc = i;
      expect(COMPLETE_SCHEMA.array(cantDoc).length).toBe(cantDoc);
    });
  }
});
