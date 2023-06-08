import { chaca } from "../../../src";
import { SCHOOL_SCHEMAS } from "../utils/cases/school";

const EXPORT_ROUTE = "./data/cases/school";
const FILE_NAME = "caseSchool";

describe("# School Case Test", () => {
  let CASE_DATA: any;

  beforeAll(() => {
    CASE_DATA = chaca.multiGenerate(SCHOOL_SCHEMAS);
  });

  it("SQL", async () => {
    await chaca
      .toSQL(SCHOOL_SCHEMAS, {
        fileName: FILE_NAME,
        location: EXPORT_ROUTE,
      })
      .then((s) => expect(typeof s).toBe("string"));
  });

  it("JSON", () => {
    chaca
      .export(CASE_DATA, {
        fileName: FILE_NAME,
        format: "json",
        location: EXPORT_ROUTE,
      })
      .then((s) => expect(typeof s).toBe("string"));
  });

  it("Typescript", async () => {
    await chaca.export(CASE_DATA, {
      fileName: FILE_NAME,
      format: "typescript",
      location: EXPORT_ROUTE,
    });
  });

  it("Java", async () => {
    await chaca.export(CASE_DATA, {
      fileName: FILE_NAME,
      format: "java",
      location: EXPORT_ROUTE,
    });
  });

  it("Javascript", async () => {
    await chaca.export(CASE_DATA, {
      fileName: FILE_NAME,
      format: "javascript",
      location: EXPORT_ROUTE,
    });
  });

  it("Yaml", async () => {
    await chaca.export(CASE_DATA, {
      location: EXPORT_ROUTE,
      fileName: FILE_NAME,
      format: "yaml",
    });
  });
});
