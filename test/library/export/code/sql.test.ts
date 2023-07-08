import { ChacaError, chaca } from "../../../../src";
import {
  createTestFolder,
  deleteTestFolder,
} from "../../../utils/functions/folder";
import { COMPLETE_SCHEMA } from "../../../utils/schemas/schemaComplete";
import { NESTED_OBJECT_SCHEMA } from "../../../utils/schemas/schemaNestedObjects";
import { SCHEMA_WITH_ARRAY_FIELDS } from "../../../utils/schemas/schemaWithArray";
import { SIMPLE_SCHEMA } from "../../../utils/schemas/simpleSchema";

const ROOT = "./data/postgresql";
const COUNT_DOCUMENTS = 50;

describe("# SQL Export Test", () => {
  let ARRAY_FIELDS_DATA: any;
  let COMPLETE_SCHEMA_DATA: any;
  let NESTED_OBJECTS_DATA: any;
  let SIMPLE_SCHEMA_DATA: any;

  beforeAll(() => {
    createTestFolder("postgresql");

    ARRAY_FIELDS_DATA = SCHEMA_WITH_ARRAY_FIELDS.generate(50);
    COMPLETE_SCHEMA_DATA = COMPLETE_SCHEMA.generate(50);
    NESTED_OBJECTS_DATA = NESTED_OBJECT_SCHEMA.generate(50);
    SIMPLE_SCHEMA_DATA = SIMPLE_SCHEMA.generate(50);
  });

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
      await expect(() =>
        chaca.exportFromSchemas(
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
          { verbose: false },
        ),
      ).rejects.toThrowError(ChacaError);
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
      await expect(() =>
        chaca.export(ARRAY_FIELDS_DATA, {
          fileName: "arrayFieldsSchemaExport",
          location: ROOT,
          format: "postgresql",
        }),
      ).rejects.toThrowError(ChacaError);
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
