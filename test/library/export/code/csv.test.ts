import { chaca, ChacaError } from "../../../../src";
import { COMPLETE_SCHEMA_DOCS } from "../utils/schemaComplete";
import { TEST_ARRAY_DOCS } from "../utils/schemaNestedObjects";
import { SIMPLE_OBJECT } from "../utils/simpleSchema";

const objectFileName = "csvExport";
const ROOT = "./data/csv";

describe("#Export CSV test", () => {
  describe("Export prmitive values", () => {
    it("Export string", () => {
      chaca
        .export("Hi", {
          fileName: objectFileName + "String",
          location: ROOT,
          format: "csv",
        })
        .then(() => {
          throw Error();
        })
        .catch((error) => expect(error instanceof ChacaError).toBe(true));
    });

    it("Export number", () => {
      chaca
        .export(5, {
          fileName: objectFileName + "Number",
          location: ROOT,
          format: "csv",
        })
        .then(() => {
          throw Error();
        })
        .catch((error) => expect(error instanceof ChacaError).toBe(true));
    });

    it("Export boolean", () => {
      chaca
        .export(true, {
          fileName: objectFileName + "Boolean",
          location: ROOT,
          format: "csv",
        })
        .then(() => {
          throw Error();
        })
        .catch((error) => expect(error instanceof ChacaError).toBe(true));
    });
  });

  describe("Export Objects", () => {
    it("Export simple object", () => {
      chaca
        .export(SIMPLE_OBJECT, {
          fileName: objectFileName + "SimpleObject",
          location: ROOT,
          format: "csv",
        })
        .then((s) => {
          expect(typeof s === "string").toBe(true);
        });
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
        .then(() => {
          throw new Error();
        })
        .catch((error) => expect(error instanceof ChacaError).toBe(true));
    });

    it("Array of complete schema", () => {
      chaca
        .export(COMPLETE_SCHEMA_DOCS, {
          fileName: objectFileName + "ArrayCompleteSchema",
          location: ROOT,
          format: "csv",
        })
        .then(() => {
          throw new Error();
        })
        .catch((error) => expect(error instanceof ChacaError).toBe(true));
    });
  });
});
