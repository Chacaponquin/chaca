import { chaca } from "../../../src";
import { SCHOOL_SCHEMAS } from "../../utils/cases/school";
import { createTestFolder } from "../../utils/functions/folder";

const EXPORT_ROUTE = "./data/cases/school";
const FILE_NAME = "caseSchool";

describe("# School Case Test", () => {
  let CASE_DATA: any;

  beforeAll(() => {
    createTestFolder("cases/school");
    CASE_DATA = chaca.multiGenerate(SCHOOL_SCHEMAS, { verbose: false });
  });

  it("Creation", () => {
    const DATA = chaca.multiGenerate(SCHOOL_SCHEMAS, { verbose: false });
    expect(DATA).toHaveProperty("Municipality");
    expect(DATA).toHaveProperty("Group");
    expect(DATA).toHaveProperty("Grade");
    expect(DATA).toHaveProperty("Student");
    expect(DATA).toHaveProperty("Year");
    expect(DATA).toHaveProperty("Subject");
    expect(DATA).toHaveProperty("Subject_Student");
  });

  it("SQL", async () => {
    await chaca.exportFromSchemas(
      SCHOOL_SCHEMAS,
      {
        fileName: FILE_NAME,
        location: EXPORT_ROUTE,
        format: "postgresql",
      },
      { verbose: false },
    );
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

  it("Python", async () => {
    await chaca.export(CASE_DATA, {
      location: EXPORT_ROUTE,
      fileName: FILE_NAME,
      format: "python",
    });
  });
});
