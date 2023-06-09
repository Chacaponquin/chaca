import { chaca } from "../../../src";
import { BASEBALL_SCHEMAS } from "../utils/cases/baseball";

const EXPORT_ROUTE = "./data/cases/baseball";
const FILE_NAME = "caseBaseball";

describe("# Baseball Case Test", () => {
  let BASEBALL_CASE_DATA: any;

  beforeAll(() => {
    BASEBALL_CASE_DATA = chaca.multiGenerate(BASEBALL_SCHEMAS);
  });

  it("Creation", () => {
    const DATA = chaca.multiGenerate(BASEBALL_SCHEMAS);

    expect(DATA).toHaveProperty("Game");
    expect(DATA).toHaveProperty("Phase");
    expect(DATA).toHaveProperty("Stadium");
    expect(DATA).toHaveProperty("Team");
    expect(DATA).toHaveProperty("TeamMember");
    expect(DATA).toHaveProperty("Player");
    expect(DATA).toHaveProperty("Coach");
    expect(DATA).toHaveProperty("Pitcher");
    expect(DATA).toHaveProperty("Batter");
  });

  /* it("SQL", async () => {
    await chaca.toSQL(BASEBALL_SCHEMAS, {
      fileName: FILE_NAME,
      location: EXPORT_ROUTE,
    });
  });*/

  it("JSON", async () => {
    await chaca.export(BASEBALL_CASE_DATA, {
      fileName: FILE_NAME,
      format: "json",
      location: EXPORT_ROUTE,
    });
  });

  it("Typescript", async () => {
    await chaca.export(BASEBALL_CASE_DATA, {
      fileName: FILE_NAME,
      format: "typescript",
      location: EXPORT_ROUTE,
    });
  });

  it("Java", async () => {
    await chaca.export(BASEBALL_CASE_DATA, {
      fileName: FILE_NAME,
      format: "java",
      location: EXPORT_ROUTE,
    });
  });

  it("Javascript", async () => {
    await chaca.export(BASEBALL_CASE_DATA, {
      fileName: FILE_NAME,
      format: "javascript",
      location: EXPORT_ROUTE,
    });
  });

  it("Yaml", async () => {
    await chaca.export(BASEBALL_CASE_DATA, {
      location: EXPORT_ROUTE,
      fileName: FILE_NAME,
      format: "yaml",
    });
  });
});
