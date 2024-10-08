import { chaca } from "../../../src";
import { COMPLETE_SCHEMA } from "../../utils/schemas/schema-complete";
import { NESTED_OBJECT_SCHEMA } from "../../utils/schemas/schema-nested-objects";
import { SCHEMA_WITH_ARRAY_FIELDS } from "../../utils/schemas/schema-with-array";
import { SIMPLE_SCHEMA } from "../../utils/schemas/simple-schema";
import { checkFile } from "./utils/export-util";
import { describe, expect, it, beforeAll } from "vitest";

const filename = "typescript";
const ROOT = "./data/typescript";
const ext = "ts";

describe("# Export Typescript", () => {
  let COMPLETE_SCHEMA_DATA: any;
  let NESTED_OBJECTS_DATA: any;

  beforeAll(() => {
    COMPLETE_SCHEMA_DATA = COMPLETE_SCHEMA.array(50);
    NESTED_OBJECTS_DATA = NESTED_OBJECT_SCHEMA.array(50);
  });

  describe("Export configuration", () => {
    it("Pass zip=true. Should create a zip file", async () => {
      const route = await chaca.export(
        {},
        {
          filename: filename + "Zip",
          format: { ext: "typescript", zip: true },
          location: ROOT,
        },
      );

      expect(checkFile({ route, ext: "zip" })).toBe(true);
    });
  });

  describe("Export primitive values", () => {
    it("Export number", async () => {
      const route = await chaca.export(10, {
        format: "typescript",
        filename: filename + "Number",
        location: ROOT,
      });

      expect(checkFile({ route, ext })).toBe(true);
    });

    it("Export boolean", async () => {
      const route = await chaca.export(false, {
        format: "typescript",
        filename: filename + "Boolean",
        location: ROOT,
      });

      expect(checkFile({ route, ext })).toBe(true);
    });

    it("Export String", async () => {
      const route = await chaca.export("Hi", {
        format: "typescript",
        filename: filename + "String",
        location: ROOT,
      });

      expect(checkFile({ route, ext })).toBe(true);
    });
  });

  describe("Export Array", () => {
    it("Array of diferent objects", async () => {
      const data = [
        { name: "Hector", age: 20 },
        { fullName: "Pquito antonio", favoriteNumber: 50 },
      ];

      const route = await chaca.export(data, {
        format: "typescript",
        filename: filename + "ArrayDiferentObject",
        location: ROOT,
      });

      expect(checkFile({ route, ext })).toBe(true);
    });

    it("Array of Complete Schema", async () => {
      const route = await chaca.export(COMPLETE_SCHEMA_DATA, {
        format: "typescript",
        filename: filename + "ArrayCompleteSchema",
        location: ROOT,
      });

      expect(checkFile({ route, ext })).toBe(true);
    });

    it("Array of Schema with Nested Objects", async () => {
      const route = await chaca.export(NESTED_OBJECTS_DATA, {
        format: "typescript",
        filename: filename + "ArrayNestedObjectsSchema",
        location: ROOT,
      });

      expect(checkFile({ route, ext })).toBe(true);
    });
  });

  describe("Export Object", () => {
    it("Export empty object", async () => {
      const route = await chaca.export(
        {},
        {
          format: "typescript",
          filename: filename + "EmptyObject",
          location: ROOT,
        },
      );

      expect(checkFile({ route, ext })).toBe(true);
    });

    it("Export simple object", async () => {
      const route = await chaca.export(SIMPLE_SCHEMA.object(), {
        format: "typescript",
        filename: filename + "SimpleObject",
        location: ROOT,
      });

      expect(checkFile({ route, ext })).toBe(true);
    });

    it("Export complete schema object", async () => {
      const route = await chaca.export(COMPLETE_SCHEMA.object(), {
        format: "typescript",
        filename: filename + "CompleteSchemaObject",
        location: ROOT,
      });

      expect(checkFile({ route, ext })).toBe(true);
    });

    it("Export nested object schema object", async () => {
      const route = await chaca.export(NESTED_OBJECT_SCHEMA.object(), {
        format: "typescript",
        filename: filename + "NestedObjectsSchemaObject",
        location: ROOT,
      });

      expect(checkFile({ route, ext })).toBe(true);
    });

    it("Export schema with array fields object", async () => {
      const route = await chaca.export(SCHEMA_WITH_ARRAY_FIELDS.object(), {
        format: "typescript",
        filename: filename + "FieldsWithArrayObject",
        location: ROOT,
      });

      expect(checkFile({ route, ext })).toBe(true);
    });
  });
});
