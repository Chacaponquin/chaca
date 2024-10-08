import { chaca } from "../../../src";
import { VARIANT_ARRAY } from "./utils/array-variate";
import { checkFile } from "./utils/export-util";
import { describe, expect, it } from "vitest";

const filename = "python";
const ROOT = "./data/python";
const ext = "py";

describe("# Python Export Test", () => {
  describe("Export configuration", () => {
    it("Pass zip=true. Should create a zip file", async () => {
      const route = await chaca.export(
        {},
        {
          filename: filename + "Zip",
          format: { ext: "python", zip: true },
          location: ROOT,
        },
      );

      expect(checkFile({ route: route, ext: "zip" })).toBe(true);
    });
  });

  describe("Export Primitive values", () => {
    it("Export string", async () => {
      const route = await chaca.export("String Test", {
        format: "python",
        filename: filename + "String",
        location: ROOT,
      });

      expect(checkFile({ route: route, ext })).toBe(true);
    });

    it("Export null", async () => {
      const route = await chaca.export(null, {
        format: "python",
        filename: filename + "Null",
        location: ROOT,
      });

      expect(checkFile({ route, ext })).toBe(true);
    });

    it("Export number", async () => {
      const route = await chaca.export(10, {
        format: "python",
        filename: filename + "Number",
        location: ROOT,
      });

      expect(checkFile({ route, ext })).toBe(true);
    });

    it("Export boolean", async () => {
      const route = await chaca.export(true, {
        format: "python",
        filename: filename + "Boolean",
        location: ROOT,
      });

      expect(checkFile({ route, ext })).toBe(true);
    });
  });

  describe("Export an Array", () => {
    it("Export an array of any elements", async () => {
      const route = await chaca.export(VARIANT_ARRAY, {
        format: "python",
        filename: filename + "ArrayAnyElements",
        location: ROOT,
      });

      expect(checkFile({ route, ext })).toBe(true);
    });
  });

  describe("Export an Date", () => {
    it("Export a new Date", async () => {
      const route = await chaca.export(new Date(), {
        format: "python",
        filename: filename + "DateNow",
        location: ROOT,
      });

      expect(checkFile({ route, ext })).toBe(true);
    });
  });

  describe("Export an object", () => {
    it("Export empty object", async () => {
      const route = await chaca.export(
        {},
        {
          format: "python",
          filename: filename + "EmptyObject",
          location: ROOT,
        },
      );

      expect(checkFile({ route, ext })).toBe(true);
    });
  });
});
