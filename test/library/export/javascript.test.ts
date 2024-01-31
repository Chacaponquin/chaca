import { chaca } from "../../../src";
import { VARIANT_ARRAY } from "./utils/array-variate";
import { checkFile } from "./utils/export-util";

const fileName = "javascript";
const ROOT = "./data/javascript";
const ext = "js";

describe("# Javascript Export Test", () => {
  describe("Export configuration", () => {
    it("Pass zip=true. Should create a zip file", async () => {
      const route = await chaca.export(
        {},
        {
          fileName: fileName + "Zip",
          format: { ext: "javascript", zip: true },
          location: ROOT,
        },
      );

      expect(checkFile({ route, ext: "zip" })).toBe(true);
    });
  });

  describe("Export Primitive values", () => {
    it("Export string", async () => {
      const route = await chaca.export("Javascript Test", {
        format: "javascript",
        fileName: fileName + "String",
        location: ROOT,
      });

      expect(checkFile({ route, ext })).toBe(true);
    });

    it("Export null", async () => {
      const route = await chaca.export(null, {
        format: "javascript",
        fileName: fileName + "Null",
        location: ROOT,
      });

      expect(checkFile({ route, ext })).toBe(true);
    });

    it("Export number", async () => {
      const route = await chaca.export(10, {
        format: "javascript",
        fileName: fileName + "Number",
        location: ROOT,
      });

      expect(checkFile({ route, ext })).toBe(true);
    });

    it("Export boolean", async () => {
      const route = await chaca.export(true, {
        format: "javascript",
        fileName: fileName + "Boolean",
        location: ROOT,
      });

      expect(checkFile({ route, ext })).toBe(true);
    });
  });

  describe("Export an Array", () => {
    it("Export an array of any elements", async () => {
      const route = await chaca.export(VARIANT_ARRAY, {
        format: "javascript",
        fileName: fileName + "ArrayAnyElements",
        location: ROOT,
      });

      expect(checkFile({ route, ext })).toBe(true);
    });
  });

  describe("Export an Date", () => {
    it("Export a new Date", async () => {
      const route = await chaca.export(new Date(), {
        format: "javascript",
        fileName: fileName + "DateNow",
        location: ROOT,
      });

      expect(checkFile({ route, ext })).toBe(true);
    });
  });

  it("Export empty object", async () => {
    const route = await chaca.export(
      {},
      {
        format: "javascript",
        fileName: fileName + "EmptyObject",
        location: ROOT,
      },
    );

    expect(checkFile({ route, ext })).toBe(true);
  });
});
