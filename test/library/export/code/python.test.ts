import { chaca } from "../../../../src";
import { createTestFolder } from "../../../utils/functions/folder";
import { VARIANT_ARRAY } from "../utils/array_variate";

const objectFileName = "pythonExport";
const ROOT = "./data/python";

describe("# Python Export Test", () => {
  beforeAll(() => {
    createTestFolder("python");
  });

  describe("Export Primitive values", () => {
    it("Export string", async () => {
      await chaca.export("String Test", {
        format: "python",
        fileName: objectFileName + "String",
        location: ROOT,
      });
    });

    it("Export null", async () => {
      await chaca.export(null, {
        format: "python",
        fileName: objectFileName + "Null",
        location: ROOT,
      });
    });

    it("Export number", async () => {
      await chaca.export(10, {
        format: "python",
        fileName: objectFileName + "Number",
        location: ROOT,
      });
    });

    it("Export boolean", async () => {
      await chaca.export(true, {
        format: "python",
        fileName: objectFileName + "Boolean",
        location: ROOT,
      });
    });
  });

  describe("Export an Array", () => {
    it("Export an array of numbers", async () => {
      await chaca.export([1, 2, 3, 4], {
        format: "python",
        fileName: objectFileName + "ArrayNumbers",
        location: ROOT,
      });
    });

    it("Export an array of any elements", async () => {
      await chaca.export(VARIANT_ARRAY, {
        format: "python",
        fileName: objectFileName + "ArrayAnyElements",
        location: ROOT,
      });
    });
  });

  describe("Export an Date", () => {
    it("Export a new Date", async () => {
      await chaca.export(new Date(), {
        format: "python",
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
          format: "python",
          fileName: objectFileName + "EmptyObject",
          location: ROOT,
        },
      );
    });
  });
});
