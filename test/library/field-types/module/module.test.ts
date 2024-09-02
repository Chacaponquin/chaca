import { chaca } from "../../../../src";

describe("# Schema Field test", () => {
  it("Create an schema and use it in creation of data. Should return always 'a'", () => {
    const schema = chaca.module(() => {
      return "a";
    });

    const dataSchema = chaca.schema({
      test: schema(),
    });

    expect(dataSchema.object()["test"]).toBe("a");
  });

  it("Create an schema with arguments and the function sum the both", () => {
    const schema = chaca.module<number, { a: number; b: number }>((a) => {
      return a.a + a.b;
    });

    const dataSchema = chaca.schema({
      test: schema({ a: 5, b: 5 }),
    });

    expect(dataSchema.object()["test"]).toBe(10);
  });
});
