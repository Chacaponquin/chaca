import { ChacaError, chaca } from "../../../src";
import { COMPLETE_SCHEMA } from "../../utils/schemas/schema-complete";
import { NESTED_OBJECT_SCHEMA } from "../../utils/schemas/schema-nested-objects";
import { SCHEMA_WITH_ARRAY_FIELDS } from "../../utils/schemas/schema-with-array";
import { SIMPLE_SCHEMA } from "../../utils/schemas/simple-schema";
import { checkFile } from "./utils/export-util";

const ROOT = "./data/postgresql";
const COUNT_DOCUMENTS = 50;
const ext = "sql";

describe("# PostgreSQL Export Test", () => {
  let ARRAY_FIELDS_DATA: any;
  let COMPLETE_SCHEMA_DATA: any;
  let NESTED_OBJECTS_DATA: any;
  let SIMPLE_SCHEMA_DATA: any;

  beforeAll(() => {
    ARRAY_FIELDS_DATA = SCHEMA_WITH_ARRAY_FIELDS.generate(50);
    COMPLETE_SCHEMA_DATA = COMPLETE_SCHEMA.generate(50);
    NESTED_OBJECTS_DATA = NESTED_OBJECT_SCHEMA.generate(50);
    SIMPLE_SCHEMA_DATA = SIMPLE_SCHEMA.generate(50);
  });

  describe("Export configuration", () => {
    it("Pass zip=true. Should create a zip file", async () => {
      const route = await chaca.export(
        {},
        {
          filename: "postgresql" + "Zip",
          format: { ext: "postgresql", zip: true },
          location: ROOT,
        },
      );

      expect(checkFile({ route, ext: "zip" })).toBe(true);
    });
  });

  describe("Export Schemas (with exportFromSchemas)", () => {
    it("Export Simple Schema", async () => {
      const route = await chaca.exportFromSchemas(
        [
          {
            name: "SimpleSchema",
            schema: SIMPLE_SCHEMA,
            documents: COUNT_DOCUMENTS,
          },
        ],
        { filename: "simpleSchema", format: "postgresql", location: ROOT },
        { verbose: false },
      );

      expect(checkFile({ route, ext })).toBe(true);
    });

    it("Export Nested Object Schema", async () => {
      const route = await chaca.exportFromSchemas(
        [
          {
            name: "NestedObjectSchema",
            schema: NESTED_OBJECT_SCHEMA,
            documents: COUNT_DOCUMENTS,
          },
        ],
        {
          filename: "nestedObjectSchema",
          format: "postgresql",
          location: ROOT,
        },
        { verbose: false },
      );

      expect(checkFile({ route, ext })).toBe(true);
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
            filename: "arrayFieldsSchema",
            format: "postgresql",
            location: ROOT,
          },
          { verbose: false },
        ),
      ).rejects.toThrow(ChacaError);
    });

    it("Export Complete Schema", async () => {
      const route = await chaca.exportFromSchemas(
        [
          {
            name: "CompleteSchema",
            schema: COMPLETE_SCHEMA,
            documents: COUNT_DOCUMENTS,
          },
        ],
        {
          filename: "completeSchema",
          format: "postgresql",
          location: ROOT,
        },
        { verbose: false },
      );

      expect(checkFile({ route, ext })).toBe(true);
    });
  });

  describe("Export Schemas (with export)", () => {
    it("Export Simple Schema Array", async () => {
      const route = await chaca.export(SIMPLE_SCHEMA_DATA, {
        filename: "simpleSchemaExport",
        location: ROOT,
        format: "postgresql",
      });

      expect(checkFile({ route, ext })).toBe(true);
    });

    it("Export Nested Object Schema Array", async () => {
      const route = await chaca.export(NESTED_OBJECTS_DATA, {
        filename: "nestedObjectSchemaExport",
        location: ROOT,
        format: "postgresql",
      });

      expect(checkFile({ route, ext })).toBe(true);
    });

    it("Export Array Fields Schema Array", async () => {
      await expect(() =>
        chaca.export(ARRAY_FIELDS_DATA, {
          filename: "arrayFieldsSchemaExport",
          location: ROOT,
          format: "postgresql",
        }),
      ).rejects.toThrow(ChacaError);
    });

    it("Export Complete Schema Array", async () => {
      const route = await chaca.export(COMPLETE_SCHEMA_DATA, {
        filename: "completeSchemaExport",
        location: ROOT,
        format: "postgresql",
      });

      expect(checkFile({ route, ext })).toBe(true);
    });
  });
});
