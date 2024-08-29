import { chaca, Dataset } from "../../../src";
import { SCHOOL_SCHEMAS } from "../../utils/cases/school";

const EXPORT_ROUTE = "./data/cases/school";
const FILE_NAME = "caseSchool";

describe("# School Case Test", () => {
  let CASE_DATA: any;
  let CASE: Dataset;

  beforeAll(() => {
    CASE = chaca.dataset(SCHOOL_SCHEMAS);
    CASE_DATA = CASE.generate();
  });

  it("Creation", () => {
    expect(CASE_DATA).toHaveProperty("Municipality");
    expect(CASE_DATA).toHaveProperty("Group");
    expect(CASE_DATA).toHaveProperty("Grade");
    expect(CASE_DATA).toHaveProperty("Student");
    expect(CASE_DATA).toHaveProperty("Year");
    expect(CASE_DATA).toHaveProperty("Subject");
    expect(CASE_DATA).toHaveProperty("Subject_Student");
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
    await chaca.export(CASE_DATA, {
      filename: FILE_NAME,
      format: { ext: "java", zip: true },
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
