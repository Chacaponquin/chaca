import { chaca } from "../../../../src";
import { SIMPLE_SCHEMA_DATA } from "../../utils/data";

const objectFileName = "SqlExport";
const ROOT = "./data/sql";

describe("# SQL Export Test", () => {
  describe("Export an Array", () => {
    it("Export Simple Schema Array", () => {
      chaca
        .export(SIMPLE_SCHEMA_DATA, {
          fileName: "completeSchema" + objectFileName,
          location: ROOT,
          format: "sql",
        })
        .then((s) => expect(typeof s).toBe("string"));
    });
  });
});
