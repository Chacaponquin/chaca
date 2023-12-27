import { chaca } from "../../../src";
import { COMPLETE_SCHEMA } from "../../utils/schemas/schema-complete";
import { NESTED_OBJECT_SCHEMA } from "../../utils/schemas/schema-nested-objects";
import { SCHEMA_WITH_ARRAY_FIELDS } from "../../utils/schemas/schema-with-array";
import { SIMPLE_SCHEMA } from "../../utils/schemas/simple-schema";
import { checkFile } from "./utils/export-util";

const fileName = "typescriptExport";
const ROOT = "./data/typescript";

describe("# Export Typescript", () => {
  let COMPLETE_SCHEMA_DATA: any;
  let NESTED_OBJECTS_DATA: any;

  beforeAll(() => {
    COMPLETE_SCHEMA_DATA = COMPLETE_SCHEMA.generate(50);
    NESTED_OBJECTS_DATA = NESTED_OBJECT_SCHEMA.generate(50);
  });

  describe("Export configuration", () => {
    it("Pass zip=true. Should create a zip file", async () => {
      const route = await chaca.export(
        {},
        {
          fileName: fileName + "Zip",
          format: { ext: "typescript", zip: true },
          location: ROOT,
        },
      );

      expect(checkFile(route)).toBe(true);
    });
  });

  describe("Export primitive values", () => {
    it("Export number", async () => {
      await chaca.export(10, {
        format: "typescript",
        fileName: fileName + "Number",
        location: ROOT,
      });
    });

    it("Export boolean", async () => {
      await chaca.export(false, {
        format: "typescript",
        fileName: fileName + "Boolean",
        location: ROOT,
      });
    });

    it("Export String", async () => {
      await chaca.export("Hi", {
        format: "typescript",
        fileName: fileName + "String",
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
        fileName: fileName + "ArrayDiferentObject",
        location: ROOT,
      });
    });

    it("Array of Complete Schema", async () => {
      await chaca.export(COMPLETE_SCHEMA_DATA, {
        format: "typescript",
        fileName: fileName + "ArrayCompleteSchema",
        location: ROOT,
      });
    });

    it("Array of Schema with Nested Objects", async () => {
      await chaca.export(NESTED_OBJECTS_DATA, {
        format: "typescript",
        fileName: fileName + "ArrayNestedObjectsSchema",
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
          fileName: fileName + "EmptyObject",
          location: ROOT,
        },
      );
    });

    it("Export simple object", async () => {
      await chaca.export(SIMPLE_SCHEMA.generateObject(), {
        format: "typescript",
        fileName: fileName + "SimpleObject",
        location: ROOT,
      });
    });

    it("Export complete schema object", async () => {
      await chaca.export(COMPLETE_SCHEMA.generateObject(), {
        format: "typescript",
        fileName: fileName + "CompleteSchemaObject",
        location: ROOT,
      });
    });

    it("Export nested object schema object", async () => {
      await chaca.export(NESTED_OBJECT_SCHEMA.generateObject(), {
        format: "typescript",
        fileName: fileName + "NestedObjectsSchemaObject",
        location: ROOT,
      });
    });

    it("Export schema with array fields object", async () => {
      await chaca.export(SCHEMA_WITH_ARRAY_FIELDS.generateObject(), {
        format: "typescript",
        fileName: fileName + "FieldsWithArrayObject",
        location: ROOT,
      });
    });
  });
});
