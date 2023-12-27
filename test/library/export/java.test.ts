import { chaca } from "../../../src";
import { COMPLETE_SCHEMA } from "../../utils/schemas/schema-complete";
import { NESTED_OBJECT_SCHEMA } from "../../utils/schemas/schema-nested-objects";
import { SCHEMA_WITH_ARRAY_FIELDS } from "../../utils/schemas/schema-with-array";
import { SIMPLE_SCHEMA } from "../../utils/schemas/simple-schema";
import { checkFile } from "./utils/export-util";

const ROOT = "./data/java";

describe("# Java Export Test", () => {
  let SIMPLE_SCHEMA_DATA: any;
  let COMPLETE_SCHEMA_DATA: any;
  let NESTED_OBJECTS_DATA: any;
  let ARRAY_FIELDS_DATA: any;

  beforeAll(() => {
    SIMPLE_SCHEMA_DATA = SIMPLE_SCHEMA.generate(50);
    COMPLETE_SCHEMA_DATA = COMPLETE_SCHEMA.generate(50);
    NESTED_OBJECTS_DATA = NESTED_OBJECT_SCHEMA.generate(50);
    ARRAY_FIELDS_DATA = SCHEMA_WITH_ARRAY_FIELDS.generate(50);
  });

  describe("Export configuration", () => {
    it("Pass zip=true. Should create a zip file", async () => {
      const route = await chaca.export([], {
        fileName: "conf" + "Zip",
        format: { ext: "java", zip: true },
        location: ROOT,
      });

      expect(checkFile(route)).toBe(true);
    });
  });

  describe("Export Schemas", () => {
    it("Array Fields Schema", async () => {
      const route = await chaca.export(ARRAY_FIELDS_DATA, {
        format: { ext: "java", zip: true },
        fileName: "ArrayFieldsSchema",
        location: ROOT,
      });

      expect(checkFile(route)).toBe(true);
    });

    it("Simple Schema", async () => {
      const route = await chaca.export(SIMPLE_SCHEMA_DATA, {
        format: { ext: "java", zip: true },
        fileName: "SimpleSchema",
        location: ROOT,
      });

      expect(checkFile(route)).toBe(true);
    });

    it("Schema Nested Objects", async () => {
      const route = await chaca.export(NESTED_OBJECTS_DATA, {
        format: { ext: "java", zip: true },
        fileName: "SchemaNestedObjects",
        location: ROOT,
      });

      expect(checkFile(route)).toBe(true);
    });

    it("Complete Schema", async () => {
      const route = await chaca.export(COMPLETE_SCHEMA_DATA, {
        format: { ext: "java", zip: true },
        fileName: "CompleteSchema",
        location: ROOT,
      });

      expect(checkFile(route)).toBe(true);
    });
  });
});
