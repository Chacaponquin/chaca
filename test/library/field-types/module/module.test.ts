import { chaca } from "../../../../src";
import { describe, expect, it } from "vitest";

describe("# Schema Field test", () => {
  it("Create an schema and use it in creation of data. Should return always 'a'", () => {
    const schema = () => {
      return "a";
    };

    const dataSchema = chaca.schema({
      test: schema,
    });

    expect(dataSchema.object().test).toBe("a");
  });

  it("Create an schema with arguments and the function sum the both", () => {
    const schema = (a: { a: number; b: number }) => {
      return a.a + a.b;
    };

    const dataSchema = chaca.schema({
      test: () => schema({ a: 5, b: 5 }),
    });

    expect(dataSchema.object().test).toBe(10);
  });
});
