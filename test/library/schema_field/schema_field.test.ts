import { ChacaError, chaca, schemas } from "../../../src";

describe("# Schema Field test", () => {
  it("Pass empty string as schema name. Should throw an error", () => {
    expect(() => {
      const schema = chaca.schemaField("", (a) => {
        return "a";
      });

      schema();
    }).toThrowError(ChacaError);
  });

  it("Create an schema and use it in creation of data. Should return always 'a'", () => {
    const schema = chaca.schemaField("buenas", (a) => {
      return "a";
    });

    const dataSchema = chaca.schema({
      id: schemas.id.mongodbID(),
      test: schema(),
    });

    expect(dataSchema.generateObject()["test"]).toBe("a");
  });

  it("Create an schema with arguments and the function sum the both", () => {
    const schema = chaca.schemaField<{ a: number; b: number }>(
      "buenas",
      (a) => {
        return a.a + a.b;
      },
    );

    const dataSchema = chaca.schema({
      id: schemas.id.mongodbID(),
      test: schema({ a: 5, b: 5 }),
    });

    expect(dataSchema.generateObject()["test"]).toBe(10);
  });
});
