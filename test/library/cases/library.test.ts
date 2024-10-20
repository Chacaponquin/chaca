import { chaca, Dataset } from "../../../src";
import { LIBRARY_CASE_SCHEMA } from "../../utils/cases/library";
import { describe, beforeAll, expect, it } from "vitest";

const EXPORT_ROUTE = "./data/cases/library";
const FILE_NAME = "caseLibrary";

describe("# Library case test", () => {
  let CASE_DATA: any;
  let CASE: Dataset;

  beforeAll(() => {
    CASE = chaca.dataset(LIBRARY_CASE_SCHEMA);
    CASE_DATA = CASE.generate();
  });

  it("Creation", () => {
    expect(CASE_DATA).toHaveProperty("Book_Topic");
    expect(CASE_DATA).toHaveProperty("Book");
    expect(CASE_DATA).toHaveProperty("Author");
    expect(CASE_DATA).toHaveProperty("Library_User");
    expect(CASE_DATA).toHaveProperty("User_Sanction");
    expect(CASE_DATA).toHaveProperty("Book_Loan");
  });

  it("Postgresql", async () => {
    await CASE.export({
      filename: FILE_NAME,
      location: EXPORT_ROUTE,
      format: "postgresql",
      verbose: false,
    });
  });

  it("JSON", async () => {
    await chaca.export(CASE_DATA, {
      filename: FILE_NAME,
      format: "json",
      location: EXPORT_ROUTE,
    });
  });

  it("Typescript", async () => {
    await chaca.export(CASE_DATA, {
      filename: FILE_NAME,
      format: "typescript",
      location: EXPORT_ROUTE,
    });
  });

  it("Java", async () => {
    await CASE.export({
      filename: FILE_NAME,
      format: { ext: "java", zip: false },
      location: EXPORT_ROUTE,
    });
  });

  it("Javascript", async () => {
    await chaca.export(CASE_DATA, {
      filename: FILE_NAME,
      format: "javascript",
      location: EXPORT_ROUTE,
    });
  });

  it("Yaml", async () => {
    await chaca.export(CASE_DATA, {
      location: EXPORT_ROUTE,
      filename: FILE_NAME,
      format: "yaml",
    });
  });

  it("Python", async () => {
    await chaca.export(CASE_DATA, {
      location: EXPORT_ROUTE,
      filename: FILE_NAME,
      format: "python",
    });
  });
});
