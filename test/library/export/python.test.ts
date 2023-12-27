import { chaca } from "../../../src";
import { VARIANT_ARRAY } from "./utils/array-variate";
import { checkFile } from "./utils/export-util";

const fileName = "python";
const ROOT = "./data/python";

describe("# Python Export Test", () => {
  describe("Export configuration", () => {
    it("Pass zip=true. Should create a zip file", async () => {
      const route = await chaca.export(
        {},
        {
          fileName: fileName + "Zip",
          format: { ext: "python", zip: true },
          location: ROOT,
        },
      );

      expect(checkFile(route)).toBe(true);
    });
  });

  describe("Export Primitive values", () => {
    it("Export string", async () => {
      await chaca.export("String Test", {
        format: "python",
        fileName: fileName + "String",
        location: ROOT,
      });
    });

    it("Export null", async () => {
      await chaca.export(null, {
        format: "python",
        fileName: fileName + "Null",
        location: ROOT,
      });
    });

    it("Export number", async () => {
      await chaca.export(10, {
        format: "python",
        fileName: fileName + "Number",
        location: ROOT,
      });
    });

    it("Export boolean", async () => {
      await chaca.export(true, {
        format: "python",
        fileName: fileName + "Boolean",
        location: ROOT,
      });
    });
  });

  describe("Export an Array", () => {
    it("Export an array of numbers", async () => {
      await chaca.export([1, 2, 3, 4], {
        format: "python",
        fileName: fileName + "ArrayNumbers",
        location: ROOT,
      });
    });

    it("Export an array of any elements", async () => {
      await chaca.export(VARIANT_ARRAY, {
        format: "python",
        fileName: fileName + "ArrayAnyElements",
        location: ROOT,
      });
    });
  });

  describe("Export an Date", () => {
    it("Export a new Date", async () => {
      await chaca.export(new Date(), {
        format: "python",
        fileName: fileName + "DateNow",
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
          fileName: fileName + "EmptyObject",
          location: ROOT,
        },
      );
    });
  });
});
