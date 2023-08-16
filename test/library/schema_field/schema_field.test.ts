import { chaca } from "../../../src";

describe("# Schema Field test", () => {
  it("Create an schema and use it in creation of data. Should return always 'a'", () => {
    const schema = chaca.schemaField(() => {
      return "a";
    });

    const dataSchema = chaca.schema({
      test: schema(),
    });

    expect(dataSchema.generateObject()["test"]).toBe("a");
  });

  it("Create an schema with arguments and the function sum the both", () => {
    const schema = chaca.schemaField<{ a: number; b: number }>((a) => {
      return a.a + a.b;
    });

    const dataSchema = chaca.schema({
      test: schema({ a: 5, b: 5 }),
    });

    expect(dataSchema.generateObject()["test"]).toBe(10);
  });
});
