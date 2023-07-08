import { chaca } from "../../../../src";
import {
  createTestFolder,
  deleteTestFolder,
} from "../../../utils/functions/folder";

const objectFileName = "javascriptExport";
const ROOT = "./data/javascript";

describe("#Javascript Export Test", () => {
  beforeAll(() => {
    createTestFolder("javascript");
  });

  describe("Export Primitive values", () => {
    it("Export string", async () => {
      await chaca.export("Javascript Test", {
        format: "javascript",
        fileName: objectFileName + "String",
        location: ROOT,
      });
    });

    it("Export null", async () => {
      await chaca.export(null, {
        format: "javascript",
        fileName: objectFileName + "Null",
        location: ROOT,
      });
    });

    it("Export number", async () => {
      await chaca.export(10, {
        format: "javascript",
        fileName: objectFileName + "Number",
        location: ROOT,
      });
    });

    it("Export boolean", async () => {
      await chaca.export(true, {
        format: "javascript",
        fileName: objectFileName + "Boolean",
        location: ROOT,
      });
    });
  });

  describe("Export an Array", () => {
    it("Export an array of numbers", async () => {
      await chaca.export([1, 2, 3, 4], {
        format: "javascript",
        fileName: objectFileName + "ArrayNumbers",
        location: ROOT,
      });
    });

    it("Export an array of any elements", async () => {
      await chaca.export([1, true, { buenas: "Hola", yeah: true }, "My name"], {
        format: "javascript",
        fileName: objectFileName + "ArrayAnyElements",
        location: ROOT,
      });
    });
  });

  describe("Export an Date", () => {
    it("Export a new Date", async () => {
      await chaca.export(new Date(), {
        format: "javascript",
        fileName: objectFileName + "DateNow",
        location: ROOT,
      });
    });
  });

  describe("Export an object", () => {
    it("Export empty object", async () => {
      await chaca.export(
        {},
        {
          format: "javascript",
          fileName: objectFileName + "EmptyObject",
          location: ROOT,
        },
      );
    });
  });
});
