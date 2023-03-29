import { chaca, ChacaError } from "../../../../src";
import { TEST_ARRAY_DOCS } from "../utils/schemaNestedObjects";

const objectFileName = "csvExport";
const ROOT = "./data/csv";

describe("#Export CSV test", () => {
  describe("Export prmitive values", () => {
    it("Export string", () => {
      chaca
        .export("Buenas", {
          fileName: objectFileName + "String",
          location: ROOT,
          format: "csv",
        })
        .catch((error) => expect(error instanceof ChacaError).toBe(true));
    });
  });

  describe("Export Array", () => {
    it("Array of similar objects", () => {
      chaca
        .export(TEST_ARRAY_DOCS, {
          fileName: objectFileName + "ArraySimilarObjects",
          location: ROOT,
          format: "csv",
        })
        .then((s) => expect(typeof s === "string").toBe(true));
    });
  });
});
