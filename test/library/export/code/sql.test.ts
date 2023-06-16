import { chaca } from "../../../../src";
import {
  ARRAY_FIELDS_DATA,
  COMPLETE_SCHEMA_DATA,
  NESTED_OBJECTS_DATA,
  SIMPLE_SCHEMA_DATA,
} from "../../utils/data";
import { COMPLETE_SCHEMA } from "../../utils/schemas/simple/schemaComplete";
import { NESTED_OBJECT_SCHEMA } from "../../utils/schemas/simple/schemaNestedObjects";
import { SCHEMA_WITH_ARRAY_FIELDS } from "../../utils/schemas/simple/schemaWithArray";
import { SIMPLE_SCHEMA } from "../../utils/schemas/simple/simpleSchema";

const ROOT = "./data/sql";
const COUNT_DOCUMENTS = 50;

describe("# SQL Export Test", () => {
  describe("Export Schemas (with exportFromSchemas)", () => {
    it("Export Simple Schema", async () => {
      await chaca.exportFromSchemas(
        [
          {
            name: "SimpleSchema",
            schema: SIMPLE_SCHEMA,
            documents: COUNT_DOCUMENTS,
          },
        ],
        { fileName: "simpleSchema", format: "postgresql", location: ROOT },
      );
    });

    it("Export Nested Object Schema", async () => {
      await chaca.exportFromSchemas(
        [
          {
            name: "NestedObjectSchema",
            schema: NESTED_OBJECT_SCHEMA,
            documents: COUNT_DOCUMENTS,
          },
        ],
        {
          fileName: "nestedObjectSchema",
          format: "postgresql",
          location: ROOT,
        },
      );
    });

    it("Export Array Fields Schema", async () => {
      await chaca.exportFromSchemas(
        [
          {
            name: "ArrayFieldsSchema",
            schema: SCHEMA_WITH_ARRAY_FIELDS,
            documents: COUNT_DOCUMENTS,
          },
        ],
        {
          fileName: "arrayFieldsSchema",
          format: "postgresql",
          location: ROOT,
        },
      );
    });

    it("Export Complete Schema", async () => {
      await chaca.exportFromSchemas(
        [
          {
            name: "CompleteSchema",
            schema: COMPLETE_SCHEMA,
            documents: COUNT_DOCUMENTS,
          },
        ],
        {
          fileName: "completeSchema",
          format: "postgresql",
          location: ROOT,
        },
      );
    });
  });

  describe("Export Schemas (with export)", () => {
    it("Export Simple Schema Array", async () => {
      await chaca.export(SIMPLE_SCHEMA_DATA, {
        fileName: "simpleSchemaExport",
        location: ROOT,
        format: "postgresql",
      });
    });

    it("Export Nested Object Schema Array", async () => {
      await chaca.export(NESTED_OBJECTS_DATA, {
        fileName: "nestedObjectSchemaExport",
        location: ROOT,
        format: "postgresql",
      });
    });

    it("Export Array Fields Schema Array", async () => {
      await chaca.export(ARRAY_FIELDS_DATA, {
        fileName: "arrayFieldsSchemaExport",
        location: ROOT,
        format: "postgresql",
      });
    });

    it("Export Complete Schema Array", async () => {
      await chaca.export(COMPLETE_SCHEMA_DATA, {
        fileName: "completeSchemaExport",
        location: ROOT,
        format: "postgresql",
      });
    });
  });
});
