import { chaca } from "../../../src";
import { BASEBALL_CASE_DATA, BASEBALL_SCHEMAS } from "../utils/cases/baseball";

const EXPORT_ROUTE = "./data/cases/baseball";
const FILE_NAME = "caseBaseball";

describe("# Test Case Baseball", () => {
  it("Baseball case creation", () => {
    expect(BASEBALL_CASE_DATA).toHaveProperty("Game");
    expect(BASEBALL_CASE_DATA).toHaveProperty("Phase");
    expect(BASEBALL_CASE_DATA).toHaveProperty("Stadium");
    expect(BASEBALL_CASE_DATA).toHaveProperty("Team");
    expect(BASEBALL_CASE_DATA).toHaveProperty("TeamMember");
    expect(BASEBALL_CASE_DATA).toHaveProperty("Player");
    expect(BASEBALL_CASE_DATA).toHaveProperty("Coach");
    expect(BASEBALL_CASE_DATA).toHaveProperty("Pitcher");
    expect(BASEBALL_CASE_DATA).toHaveProperty("Batter");
  });

  it("SQL", () => {
    chaca
      .toSQL(BASEBALL_SCHEMAS, {
        fileName: FILE_NAME,
        location: EXPORT_ROUTE,
      })
      .then((s) => expect(typeof s).toBe("string"));
  });

  it("JSON", () => {
    chaca
      .export(BASEBALL_CASE_DATA, {
        fileName: FILE_NAME,
        format: "json",
        location: EXPORT_ROUTE,
      })
      .then((s) => expect(typeof s).toBe("string"));
  });

  it("Typescript", () => {
    chaca
      .export(BASEBALL_CASE_DATA, {
        fileName: FILE_NAME,
        format: "typescript",
        location: EXPORT_ROUTE,
      })
      .then((s) => expect(typeof s).toBe("string"));
  });

  it("Java", () => {
    chaca
      .export(BASEBALL_CASE_DATA, {
        fileName: FILE_NAME,
        format: "java",
        location: EXPORT_ROUTE,
      })
      .then((s) => expect(typeof s).toBe("string"));
  });

  it("Javascript", () => {
    chaca
      .export(BASEBALL_CASE_DATA, {
        fileName: FILE_NAME,
        format: "javascript",
        location: EXPORT_ROUTE,
      })
      .then((s) => expect(typeof s).toBe("string"));
  });
});
