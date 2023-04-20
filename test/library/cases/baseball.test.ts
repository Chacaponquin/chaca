import { chaca } from "../../../src";
import { BASEBALL_CASE_DATA } from "../utils/cases/baseball";

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

  it("Export baseball case in JSON", () => {
    chaca
      .export(BASEBALL_CASE_DATA, {
        fileName: FILE_NAME,
        format: "json",
        location: EXPORT_ROUTE,
      })
      .then((s) => expect(typeof s).toBe("string"));
  });

  it("Export baseball case in Typescript", () => {
    chaca
      .export(BASEBALL_CASE_DATA, {
        fileName: FILE_NAME,
        format: "typescript",
        location: EXPORT_ROUTE,
      })
      .then((s) => expect(typeof s).toBe("string"));
  });

  it("Export baseball case in Javascript", () => {
    chaca
      .export(BASEBALL_CASE_DATA, {
        fileName: FILE_NAME,
        format: "javascript",
        location: EXPORT_ROUTE,
      })
      .then((s) => expect(typeof s).toBe("string"));
  });
});
