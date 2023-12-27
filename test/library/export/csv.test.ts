import { chaca, ChacaError } from "../../../src";
import { COMPLETE_SCHEMA } from "../../utils/schemas/schema-complete";
import { NESTED_OBJECT_SCHEMA } from "../../utils/schemas/schema-nested-objects";
import { SIMPLE_SCHEMA } from "../../utils/schemas/simple-schema";
import { checkFile } from "./utils/export-util";

const fileName = "csvExport";
const ROOT = "./data/csv";

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
        fileName: fileName + "Zip",
        format: { ext: "csv", zip: true },
        location: ROOT,
      });

      expect(checkFile(route)).toBe(true);
    });
  });

  describe("Export prmitive values", () => {
    it("Export string", async () => {
      await expect(() =>
        chaca.export("Hi", {
          fileName: fileName + "String",
          location: ROOT,
          format: "csv",
        }),
      ).rejects.toThrow(ChacaError);
    });

    it("Export number", async () => {
      await expect(
        chaca.export(5, {
          fileName: fileName + "Number",
          location: ROOT,
          format: "csv",
        }),
      ).rejects.toThrow(ChacaError);
    });

    it("Export boolean", async () => {
      await expect(
        chaca.export(true, {
          fileName: fileName + "Boolean",
          location: ROOT,
          format: "csv",
        }),
      ).rejects.toThrow(ChacaError);
    });
  });

  describe("Export Array", () => {
    it("Export simple object", async () => {
      await chaca.export(SIMPLE_SCHEMA_DATA, {
        fileName: fileName + "SimpleObject",
        location: ROOT,
        format: "csv",
      });
    });

    it("Array of similar objects", async () => {
      await expect(
        chaca.export(NESTED_OBJECTS_DATA, {
          fileName: fileName + "SimpleObject",
          location: ROOT,
          format: "csv",
        }),
      ).rejects.toThrow(ChacaError);
    });

    it("Array of complete schema", async () => {
      await expect(
        chaca.export(COMPLETE_SCHEMA_DATA, {
          fileName: fileName + "ArrayCompleteSchema",
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
            fileName: fileName + "ArrayObjectDiferentProperties",
            location: ROOT,
            format: "csv",
          }),
      ).rejects.toThrow(ChacaError);
    });
  });
});
