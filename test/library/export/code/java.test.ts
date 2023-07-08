import { chaca } from "../../../../src";
import { createTestFolder } from "../../../utils/functions/folder";
import { COMPLETE_SCHEMA } from "../../../utils/schemas/schemaComplete";
import { NESTED_OBJECT_SCHEMA } from "../../../utils/schemas/schemaNestedObjects";
import { SCHEMA_WITH_ARRAY_FIELDS } from "../../../utils/schemas/schemaWithArray";
import { SIMPLE_SCHEMA } from "../../../utils/schemas/simpleSchema";

const ROOT = "./data/java";

describe("# Java Export Test", () => {
  let SIMPLE_SCHEMA_DATA: any;
  let COMPLETE_SCHEMA_DATA: any;
  let NESTED_OBJECTS_DATA: any;
  let ARRAY_FIELDS_DATA: any;

  beforeAll(() => {
    createTestFolder("java");

    SIMPLE_SCHEMA_DATA = SIMPLE_SCHEMA.generate(50);
    COMPLETE_SCHEMA_DATA = COMPLETE_SCHEMA.generate(50);
    NESTED_OBJECTS_DATA = NESTED_OBJECT_SCHEMA.generate(50);
    ARRAY_FIELDS_DATA = SCHEMA_WITH_ARRAY_FIELDS.generate(50);
  });

  describe("Export Schemas", () => {
    it("Array Fields Schema", async () => {
      await chaca.export(ARRAY_FIELDS_DATA, {
        format: "java",
        fileName: "ArrayFieldsSchemaArray",
        location: ROOT,
      });
    });

    it("Simple Schema", async () => {
      await chaca.export(SIMPLE_SCHEMA_DATA, {
        format: "java",
        fileName: "SimpleSchemaArray",
        location: ROOT,
      });
    });

    it("Schema Nested Objects", async () => {
      await chaca.export(NESTED_OBJECTS_DATA, {
        format: "java",
        fileName: "SchemaNestedObjectsArray",
        location: ROOT,
      });
    });

    it("Complete Schema", async () => {
      await chaca.export(COMPLETE_SCHEMA_DATA, {
        format: "java",
        fileName: "CompleteSchemaArray",
        location: ROOT,
      });
    });
  });
});
