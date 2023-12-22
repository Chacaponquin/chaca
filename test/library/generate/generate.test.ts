import { ChacaError, chaca, schemas } from "../../../src";

describe("# Schema generate tests", () => {
  const schema = chaca.schema({
    id: { type: schemas.id.mongodbID() },
    image: { type: schemas.image.film() },
    name: { type: schemas.person.firstName({ language: "es" }) },
  });

  const doc = schema.generateObject();

  it("Should return a define schema object with image, id and name fields", () => {
    expect(doc).toHaveProperty("id");
    expect(doc).toHaveProperty("image");
    expect(doc).toHaveProperty("name");
  });

  it("Generate negative number documents. Should throw an error", () => {
    expect(() => schema.generate(-10)).toThrow(ChacaError);
  });
});
