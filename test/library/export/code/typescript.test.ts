import { chaca } from "../../../../src";
import { createTestFolder } from "../../../utils/functions/folder";
import { COMPLETE_SCHEMA } from "../../../utils/schemas/schemaComplete";
import { NESTED_OBJECT_SCHEMA } from "../../../utils/schemas/schemaNestedObjects";
import { SCHEMA_WITH_ARRAY_FIELDS } from "../../../utils/schemas/schemaWithArray";
import { SIMPLE_SCHEMA } from "../../../utils/schemas/simpleSchema";

const objectFileName = "typescriptExport";
const ROOT = "./data/typescript";

describe("# Export Typescript", () => {
  let COMPLETE_SCHEMA_DATA: any;
  let NESTED_OBJECTS_DATA: any;

  beforeAll(() => {
    createTestFolder("typescript");

    COMPLETE_SCHEMA_DATA = COMPLETE_SCHEMA.generate(50);
    NESTED_OBJECTS_DATA = NESTED_OBJECT_SCHEMA.generate(50);
  });

  describe("Export primitive values", () => {
    it("Export number", async () => {
      await chaca.export(10, {
        format: "typescript",
        fileName: objectFileName + "Number",
        location: ROOT,
      });
    });

    it("Export boolean", async () => {
      await chaca.export(false, {
        format: "typescript",
        fileName: objectFileName + "Boolean",
        location: ROOT,
      });
    });

    it("Export String", async () => {
      await chaca.export("Hi", {
        format: "typescript",
        fileName: objectFileName + "String",
        location: ROOT,
      });
    });
  });

  describe("Export Array", () => {
    it("Array of diferent objects", async () => {
      const data = [
        { name: "Hector", age: 20 },
        { fullName: "Pquito antonio", favoriteNumber: 50 },
      ];

      await chaca.export(data, {
        format: "typescript",
        fileName: objectFileName + "ArrayDiferentObject",
        location: ROOT,
      });
    });

    it("Array of Complete Schema", async () => {
      await chaca.export(COMPLETE_SCHEMA_DATA, {
        format: "typescript",
        fileName: objectFileName + "ArrayCompleteSchema",
        location: ROOT,
      });
    });

    it("Array of Schema with Nested Objects", async () => {
      await chaca.export(NESTED_OBJECTS_DATA, {
        format: "typescript",
        fileName: objectFileName + "ArrayNestedObjectsSchema",
        location: ROOT,
      });
    });
  });

  describe("Export Object", () => {
    it("Export empty object", async () => {
      await chaca.export(
        {},
        {
          format: "typescript",
          fileName: objectFileName + "EmptyObject",
          location: ROOT,
        },
      );
    });

    it("Export simple object", async () => {
      await chaca.export(SIMPLE_SCHEMA.generateObject(), {
        format: "typescript",
        fileName: objectFileName + "SimpleObject",
        location: ROOT,
      });
    });

    it("Export complete schema object", async () => {
      await chaca.export(COMPLETE_SCHEMA.generateObject(), {
        format: "typescript",
        fileName: objectFileName + "CompleteSchemaObject",
        location: ROOT,
      });
    });

    it("Export nested object schema object", async () => {
      await chaca.export(NESTED_OBJECT_SCHEMA.generateObject(), {
        format: "typescript",
        fileName: objectFileName + "NestedObjectsSchemaObject",
        location: ROOT,
      });
    });

    it("Export schema with array fields object", async () => {
      await chaca.export(SCHEMA_WITH_ARRAY_FIELDS.generateObject(), {
        format: "typescript",
        fileName: objectFileName + "FieldsWithArrayObject",
        location: ROOT,
      });
    });
  });
});
