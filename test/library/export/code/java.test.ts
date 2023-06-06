import { chaca } from "../../../../src";
import {
  SIMPLE_SCHEMA_DATA,
  COMPLETE_SCHEMA_DATA,
  NESTED_OBJECTS_DATA,
  ARRAY_FIELDS_DATA,
} from "../../utils/data";

const ROOT = "./data/java";

describe("# Java Export Test", () => {
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
