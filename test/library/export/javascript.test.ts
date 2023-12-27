import { chaca } from "../../../src";
import { VARIANT_ARRAY } from "./utils/array-variate";
import { checkFile } from "./utils/export-util";

const fileName = "javascript";
const ROOT = "./data/javascript";

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

      expect(checkFile(route)).toBe(true);
    });
  });

  describe("Export Primitive values", () => {
    it("Export string", async () => {
      await chaca.export("Javascript Test", {
        format: "javascript",
        fileName: fileName + "String",
        location: ROOT,
      });
    });

    it("Export null", async () => {
      await chaca.export(null, {
        format: "javascript",
        fileName: fileName + "Null",
        location: ROOT,
      });
    });

    it("Export number", async () => {
      await chaca.export(10, {
        format: "javascript",
        fileName: fileName + "Number",
        location: ROOT,
      });
    });

    it("Export boolean", async () => {
      await chaca.export(true, {
        format: "javascript",
        fileName: fileName + "Boolean",
        location: ROOT,
      });
    });
  });

  describe("Export an Array", () => {
    it("Export an array of any elements", async () => {
      await chaca.export(VARIANT_ARRAY, {
        format: "javascript",
        fileName: fileName + "ArrayAnyElements",
        location: ROOT,
      });
    });
  });

  describe("Export an Date", () => {
    it("Export a new Date", async () => {
      await chaca.export(new Date(), {
        format: "javascript",
        fileName: fileName + "DateNow",
        location: ROOT,
      });
    });
  });

  it("Export empty object", async () => {
    await chaca.export(
      {},
      {
        format: "javascript",
        fileName: fileName + "EmptyObject",
        location: ROOT,
      },
    );
  });
});
