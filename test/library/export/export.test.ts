import { ChacaError } from "../../../src/errors/ChacaError";
import { SIMPLE_SCHEMA } from "../utils/schemas/simpleSchema";

const root = "./data";

describe("#Export Test", () => {
  describe("export with incorrrect arguments", () => {
    it("No file name. Should throw an error", () => {
      SIMPLE_SCHEMA.generateAndExport(1, {
        fileName: "",
        format: "json",
        location: root,
      }).catch((error) => expect(error instanceof ChacaError).toBe(true));
    });

    it("incorrect format file. Should throw an error", () => {
      SIMPLE_SCHEMA.generateAndExport(1, {
        fileName: "quetal",
        format: "buenas" as any,
        location: root,
      }).catch((error) => expect(error instanceof ChacaError).toBe(true));
    });
  });
});
