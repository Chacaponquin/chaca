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
    SIMPLE_SCHEMA_DATA = SIMPLE_SCHEMA.array(50);
    COMPLETE_SCHEMA_DATA = COMPLETE_SCHEMA.array(50);
    NESTED_OBJECTS_DATA = NESTED_OBJECT_SCHEMA.array(50);
    ARRAY_FIELDS_DATA = SCHEMA_WITH_ARRAY_FIELDS.array(50);
  });

  describe("Export configuration", () => {
    it("Pass zip=true. Should create a zip file", async () => {
      const route = await chaca.export([], {
        filename: "conf" + "Zip",
        format: { ext: "java", zip: true },
        location: ROOT,
      });

      expect(checkFile({ route, ext: "zip" })).toBe(true);
    });
  });

  describe("Export Schemas", () => {
    it("Array Fields Schema", async () => {
      const route = await chaca.export(ARRAY_FIELDS_DATA, {
        format: { ext: "java", zip: true },
        filename: "ArrayFieldsSchema",
        location: ROOT,
      });

      expect(checkFile({ route, ext: "zip" })).toBe(true);
    });

    it("Simple Schema", async () => {
      const route = await chaca.export(SIMPLE_SCHEMA_DATA, {
        format: { ext: "java", zip: true },
        filename: "SimpleSchema",
        location: ROOT,
      });

      expect(checkFile({ route, ext: "zip" })).toBe(true);
    });

    it("Schema Nested Objects", async () => {
      const route = await chaca.export(NESTED_OBJECTS_DATA, {
        format: { ext: "java", zip: true },
        filename: "SchemaNestedObjects",
        location: ROOT,
      });

      expect(checkFile({ route, ext: "zip" })).toBe(true);
    });

    it("Complete Schema", async () => {
      const route = await chaca.export(COMPLETE_SCHEMA_DATA, {
        format: { ext: "java", zip: true },
        filename: "CompleteSchema",
        location: ROOT,
      });

      expect(checkFile({ route, ext: "zip" })).toBe(true);
    });
  });
});
