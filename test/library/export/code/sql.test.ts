import { chaca } from "../../../../src";
import {
  ARRAY_FIELDS_DATA,
  COMPLETE_SCHEMA_DATA,
  NESTED_OBJECTS_DATA,
  SIMPLE_SCHEMA_DATA,
} from "../../utils/data";

const objectFileName = "SqlExport";
const ROOT = "./data/sql";

describe("# SQL Export Test", () => {
  describe("Export an Array", () => {
    it("Export Simple Schema Array", () => {
      chaca
        .export(SIMPLE_SCHEMA_DATA, {
          fileName: "simpleSchema" + objectFileName,
          location: ROOT,
          format: "sql",
        })
        .then((s) => expect(typeof s).toBe("string"));
    });

    it("Export Nested Object Schema Array", () => {
      chaca
        .export(NESTED_OBJECTS_DATA, {
          fileName: "nestedObjectSchema" + objectFileName,
          location: ROOT,
          format: "sql",
        })
        .then((s) => expect(typeof s).toBe("string"));
    });

    it("Export Array Fields Schema Array", () => {
      chaca
        .export(ARRAY_FIELDS_DATA, {
          fileName: "arrayFieldsSchema" + objectFileName,
          location: ROOT,
          format: "sql",
        })
        .then((s) => expect(typeof s).toBe("string"));
    });

    /*   it("Export Complete Schema Array", () => {
      chaca
        .export(COMPLETE_SCHEMA_DATA, {
          fileName: "completeSchema" + objectFileName,
          location: ROOT,
          format: "sql",
        })
        .then((s) => expect(typeof s).toBe("string"));
    });*/
  });
});
