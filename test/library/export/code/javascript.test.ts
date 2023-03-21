import { chaca } from "../../../../src";

const objectFileName = "javascriptExport";
const ROOT = "./data";

describe("#Javascript Export Test", () => {
  describe("Export Primitive values", () => {
    it("Export string", () => {
      chaca
        .export("Javascript Test", {
          format: "javascript",
          fileName: objectFileName + "String",
          location: ROOT,
        })
        .then((s) => expect(typeof s === "string").toBe(true));
    });

    it("Export null", () => {
      chaca
        .export(null, {
          format: "javascript",
          fileName: objectFileName + "Null",
          location: ROOT,
        })
        .then((s) => expect(typeof s === "string").toBe(true));
    });

    it("Export number", () => {
      chaca
        .export(10, {
          format: "javascript",
          fileName: objectFileName + "Number",
          location: ROOT,
        })
        .then((s) => expect(typeof s === "string").toBe(true));
    });

    it("Export boolean", () => {
      chaca
        .export(true, {
          format: "javascript",
          fileName: objectFileName + "Boolean",
          location: ROOT,
        })
        .then((s) => expect(typeof s === "string").toBe(true));
    });
  });

  describe("Export an Array", () => {
    it("Export an array of numbers", () => {
      chaca
        .export([1, 2, 3, 4], {
          format: "javascript",
          fileName: objectFileName + "ArrayNumbers",
          location: ROOT,
        })
        .then((s) => expect(typeof s === "string").toBe(true));
    });

    it("Export an array of any elements", () => {
      chaca
        .export([1, true, { buenas: "Hola", yeah: true }, "My name"], {
          format: "javascript",
          fileName: objectFileName + "ArrayAnyElements",
          location: ROOT,
        })
        .then((s) => expect(typeof s === "string").toBe(true));
    });
  });

  describe("Export an object", () => {
    it("Export empty object", () => {
      chaca
        .export(
          {},
          {
            format: "javascript",
            fileName: objectFileName + "EmptyObject",
            location: ROOT,
          },
        )
        .then((s) => expect(typeof s === "string").toBe(true));
    });
  });
});
