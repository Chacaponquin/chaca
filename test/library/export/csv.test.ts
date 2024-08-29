import { chaca, ChacaError } from "../../../src";
import { COMPLETE_SCHEMA } from "../../utils/schemas/schema-complete";
import { NESTED_OBJECT_SCHEMA } from "../../utils/schemas/schema-nested-objects";
import { SIMPLE_SCHEMA } from "../../utils/schemas/simple-schema";
import { checkFile } from "./utils/export-util";

const filename = "csvExport";
const ROOT = "./data/csv";
const ext = "csv";

describe("#Export CSV test", () => {
  let COMPLETE_SCHEMA_DATA: any;
  let NESTED_OBJECTS_DATA: any;
  let SIMPLE_SCHEMA_DATA: any;

  beforeAll(() => {
    COMPLETE_SCHEMA_DATA = COMPLETE_SCHEMA.generate(50);
    NESTED_OBJECTS_DATA = NESTED_OBJECT_SCHEMA.generate(50);
    SIMPLE_SCHEMA_DATA = SIMPLE_SCHEMA.generate(50);
  });

  describe("Export configuration", () => {
    it("Pass zip=true. Should create a zip file", async () => {
      const route = await chaca.export([], {
        filename: filename + "Zip",
        format: { ext: "csv", zip: true },
        location: ROOT,
      });

      expect(checkFile({ route, ext: "zip" })).toBe(true);
    });
  });

  describe("Export prmitive values", () => {
    it("Export string", async () => {
      await expect(() =>
        chaca.export("Hi", {
          filename: filename + "String",
          location: ROOT,
          format: "csv",
        }),
      ).rejects.toThrow(ChacaError);
    });

    it("Export number", async () => {
      await expect(
        chaca.export(5, {
          filename: filename + "Number",
          location: ROOT,
          format: "csv",
        }),
      ).rejects.toThrow(ChacaError);
    });

    it("Export boolean", async () => {
      await expect(
        chaca.export(true, {
          filename: filename + "Boolean",
          location: ROOT,
          format: "csv",
        }),
      ).rejects.toThrow(ChacaError);
    });
  });

  describe("Export Array", () => {
    it("Export simple object", async () => {
      const route = await chaca.export(SIMPLE_SCHEMA_DATA, {
        filename: filename + "SimpleObject",
        location: ROOT,
        format: "csv",
      });

      expect(checkFile({ route, ext })).toBe(true);
    });

    it("Array of similar objects", async () => {
      await expect(
        chaca.export(NESTED_OBJECTS_DATA, {
          filename: filename + "SimpleObject",
          location: ROOT,
          format: "csv",
        }),
      ).rejects.toThrow(ChacaError);
    });

    it("Array of complete schema", async () => {
      await expect(
        chaca.export(COMPLETE_SCHEMA_DATA, {
          filename: filename + "ArrayCompleteSchema",
          location: ROOT,
          format: "csv",
        }),
      ).rejects.toThrow(ChacaError);
    });

    it("Array of object with diferent properties", async () => {
      const data = [
        { name: "Hector", age: 20 },
        { fullName: "Paquito antonio", favoriteNumber: 50 },
      ];

      await expect(
        async () =>
          await chaca.export(data, {
            filename: filename + "ArrayObjectDiferentProperties",
            location: ROOT,
            format: "csv",
          }),
      ).rejects.toThrow(ChacaError);
    });
  });
});
