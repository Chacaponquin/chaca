import { chaca } from "../../../src";
import { LIBRARY_CASE_SCHEMA } from "../utils/cases/library";

const EXPORT_ROUTE = "./data/cases/library";
const FILE_NAME = "caseLibrary";

describe("# Library Case Test", () => {
  let CASE_DATA: any;

  beforeAll(() => {
    CASE_DATA = chaca.multiGenerate(LIBRARY_CASE_SCHEMA);
  });

  it("Creation", () => {
    const DATA = chaca.multiGenerate(LIBRARY_CASE_SCHEMA);
    expect(DATA).toHaveProperty("Book_Topic");
    expect(DATA).toHaveProperty("Book");
    expect(DATA).toHaveProperty("Author");
    expect(DATA).toHaveProperty("User");
    expect(DATA).toHaveProperty("User_Sanction");
    expect(DATA).toHaveProperty("Book_Loan");
  });

  it("SQL", async () => {
    jest.setTimeout(10000);

    await chaca.toSQL(LIBRARY_CASE_SCHEMA, {
      fileName: FILE_NAME,
      location: EXPORT_ROUTE,
    });
  });

  it("JSON", async () => {
    await chaca.export(CASE_DATA, {
      fileName: FILE_NAME,
      format: "json",
      location: EXPORT_ROUTE,
    });
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
