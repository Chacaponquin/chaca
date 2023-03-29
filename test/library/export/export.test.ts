import { schemas, chaca } from "../../../src";
import { ChacaError } from "../../../src/errors/ChacaError";

const schema = new chaca.Schema({
  id: { type: schemas.id.mongodbID() },
  image: { type: schemas.image.film() },
  name: { type: schemas.person.firstName({ language: "es" }) },
});

const root = "./data";

describe("#Export Test", () => {
  describe("export with incorrrect arguments", () => {
    it("no file name. Should throw an error", () => {
      schema
        .generateAndExport(1, {
          fileName: "",
          format: "json",
          location: root,
        })
        .catch((error) => expect(error instanceof ChacaError).toBe(true));
    });

    it("incorrect format file. Should throw an error", () => {
      schema
        .generateAndExport(1, {
          fileName: "quetal",
          format: "buenas" as any,
          location: root,
        })
        .catch((error) => expect(error instanceof ChacaError).toBe(true));
    });
  });
});
