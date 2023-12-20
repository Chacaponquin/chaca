import { ChacaError } from "../../../src/errors";
import { SIMPLE_SCHEMA } from "../../utils/schemas/simple-schema";

const root = "./data";

describe("# Export Test", () => {
  describe("Export with incorrrect arguments", () => {
    it("No file name. Should throw an error", async () => {
      await expect(() =>
        SIMPLE_SCHEMA.generateAndExport(1, {
          fileName: "",
          format: "json",
          location: root,
        }),
      ).rejects.toThrow(ChacaError);
    });

    it("Incorrect format file. Should throw an error", async () => {
      await expect(() =>
        SIMPLE_SCHEMA.generateAndExport(1, {
          fileName: "quetal",
          format: "buenas" as any,
          location: root,
        }),
      ).rejects.toThrowError(ChacaError);
    });
  });
});
