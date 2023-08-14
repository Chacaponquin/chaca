import { chaca, ChacaError } from "../../../../src";
import { createTestFolder } from "../../../utils/functions/folder";
import { COMPLETE_SCHEMA } from "../../../utils/schemas/schemaComplete";
import { NESTED_OBJECT_SCHEMA } from "../../../utils/schemas/schemaNestedObjects";
import { SIMPLE_SCHEMA } from "../../../utils/schemas/simpleSchema";

const objectFileName = "csvExport";
const ROOT = "./data/csv";

describe("#Export CSV test", () => {
  let COMPLETE_SCHEMA_DATA: any;
  let NESTED_OBJECTS_DATA: any;
  let SIMPLE_SCHEMA_DATA: any;

  beforeAll(() => {
    createTestFolder("csv");

    COMPLETE_SCHEMA_DATA = COMPLETE_SCHEMA.generate(50);
    NESTED_OBJECTS_DATA = NESTED_OBJECT_SCHEMA.generate(50);
    SIMPLE_SCHEMA_DATA = SIMPLE_SCHEMA.generate(50);
  });

  describe("Export prmitive values", () => {
    it("Export string", async () => {
      await expect(() =>
        chaca.export("Hi", {
          fileName: objectFileName + "String",
          location: ROOT,
          format: "csv",
        }),
      ).rejects.toThrow(ChacaError);
    });

    it("Export number", async () => {
      await expect(
        chaca.export(5, {
          fileName: objectFileName + "Number",
          location: ROOT,
          format: "csv",
        }),
      ).rejects.toThrowError(ChacaError);
    });

    it("Export boolean", async () => {
      await expect(
        chaca.export(true, {
          fileName: objectFileName + "Boolean",
          location: ROOT,
          format: "csv",
        }),
      ).rejects.toThrowError(ChacaError);
    });
  });

  describe("Export Objects", () => {});

  describe("Export Array", () => {
    it("Export simple object", async () => {
      await chaca.export(SIMPLE_SCHEMA_DATA, {
        fileName: objectFileName + "SimpleObject",
        location: ROOT,
        format: "csv",
      });
    });

    it("Array of similar objects", async () => {
      await expect(
        chaca.export(NESTED_OBJECTS_DATA, {
          fileName: objectFileName + "SimpleObject",
          location: ROOT,
          format: "csv",
        }),
      ).rejects.toThrowError(ChacaError);
    });

    it("Array of complete schema", async () => {
      await expect(
        chaca.export(COMPLETE_SCHEMA_DATA, {
          fileName: objectFileName + "ArrayCompleteSchema",
          location: ROOT,
          format: "csv",
        }),
      ).rejects.toThrowError(ChacaError);
    });

    it("Array of object with diferent properties", async () => {
      const data = [
        { name: "Hector", age: 20 },
        { fullName: "Paquito antonio", favoriteNumber: 50 },
      ];

      await expect(
        async () =>
          await chaca.export(data, {
            fileName: objectFileName + "ArrayObjectDiferentProperties",
            location: ROOT,
            format: "csv",
          }),
      ).rejects.toThrow(ChacaError);
    });
  });
});
