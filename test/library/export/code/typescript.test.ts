import { chaca } from "../../../../src";

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
        .then((s) => expect(typeof s === "string").toBe(true));
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

    it("Export ", () => {});

    it("Export empty object", () => {
      chaca
        .export(
          {
            buenas: "Hola",
            yeah: "Que tal",
          },
          {
            format: "typescript",
            fileName: objectFileName + "ComplexObject",
            location: ROOT,
          },
        )
        .then((s) => expect(typeof s === "string").toBe(true));
    });
  });
});
