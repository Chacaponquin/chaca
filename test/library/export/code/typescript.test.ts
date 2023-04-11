import { chaca } from "../../../../src";
import { COMPLETE_SCHEMA_DOCS } from "../utils/schemaComplete";
import { NESTED_OBJECTS_DOCS } from "../utils/schemaNestedObjects";
import { SIMPLE_OBJECT } from "../utils/simpleObject";

const objectFileName = "typescriptExport";
const ROOT = "./data/typescript";

describe("#Export Typescript", () => {
  describe("Export primitive values", () => {
    it("Export number", () => {
      chaca
        .export(10, {
          format: "typescript",
          fileName: objectFileName + "Number",
          location: ROOT,
        })
        .then((s) => expect(typeof s === "string").toBe(true));
    });

    it("Export boolean", () => {
      chaca
        .export(false, {
          format: "typescript",
          fileName: objectFileName + "Boolean",
          location: ROOT,
        })
        .then((s) => expect(typeof s === "string").toBe(true));
    });

    it("Export String", () => {
      chaca
        .export("Buenas", {
          format: "typescript",
          fileName: objectFileName + "String",
          location: ROOT,
        })
        .then((s) => expect(typeof s === "string").toBe(true));
    });
  });

  describe("Export Array", () => {
    it("Array of diferent objects", () => {
      const data = [
        { name: "Hector", age: 20 },
        { fullName: "Pquito antonio", favoriteNumber: 50 },
      ];

      chaca
        .export(data, {
          format: "typescript",
          fileName: objectFileName + "ArrayDiferentObject",
          location: ROOT,
        })
        .then((s) => expect(typeof s).toBe("string"));
    });

    it("Array of Complete Schema", () => {
      chaca
        .export(COMPLETE_SCHEMA_DOCS, {
          format: "typescript",
          fileName: objectFileName + "ArrayCompleteSchema",
          location: ROOT,
        })
        .then((s) => expect(typeof s).toBe("string"));
    });

    it("Array of Schema with Nested Objects", () => {
      chaca
        .export(NESTED_OBJECTS_DOCS, {
          format: "typescript",
          fileName: objectFileName + "ArrayNestedObjectsSchema",
          location: ROOT,
        })
        .then((s) => expect(typeof s).toBe("string"));
    });
  });

  describe("Export Object", () => {
    it("Export empty object", () => {
      chaca
        .export(
          {},
          {
            format: "typescript",
            fileName: objectFileName + "EmptyObject",
            location: ROOT,
          },
        )
        .then((s) => expect(typeof s === "string").toBe(true));
    });

    it("Export simple object", () => {
      chaca
        .export(SIMPLE_OBJECT, {
          format: "typescript",
          fileName: objectFileName + "SimpleObject",
          location: ROOT,
        })
        .then((s) => expect(typeof s === "string").toBe(true));
    });
  });
});
