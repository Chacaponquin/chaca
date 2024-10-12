import { chaca, Dataset } from "../../../src";
import { BASEBALL_SCHEMAS } from "../../utils/cases/baseball";
import { describe, beforeAll, expect, it } from "vitest";

const EXPORT_ROUTE = "./data/cases/baseball";
const FILE_NAME = "caseBaseball";

describe("# Baseball Case Test", () => {
  let BASEBALL_CASE: Dataset;
  let DATA: any;

  beforeAll(() => {
    BASEBALL_CASE = chaca.dataset(BASEBALL_SCHEMAS);
    DATA = BASEBALL_CASE.generate();
  });

  it("Creation", () => {
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

  it("Postgresql", async () => {
    await BASEBALL_CASE.export({
      filename: FILE_NAME,
      location: EXPORT_ROUTE,
      format: "postgresql",
      verbose: false,
    });
  });

  it("CSV", async () => {
    await BASEBALL_CASE.export({
      filename: FILE_NAME,
      location: EXPORT_ROUTE,
      format: { ext: "csv", zip: false },
      verbose: false,
    });
  });

  it("JSON", async () => {
    await chaca.export(DATA, {
      filename: FILE_NAME,
      format: "json",
      location: EXPORT_ROUTE,
    });
  });

  it("Typescript", async () => {
    await chaca.export(DATA, {
      filename: FILE_NAME,
      format: "typescript",
      location: EXPORT_ROUTE,
    });
  });

  it("Java", async () => {
    await chaca.export(DATA, {
      filename: FILE_NAME,
      format: { ext: "java", zip: true },
      location: EXPORT_ROUTE,
    });
  });

  it("Javascript", async () => {
    await chaca.export(DATA, {
      filename: FILE_NAME,
      format: "javascript",
      location: EXPORT_ROUTE,
    });
  });

  it("Yaml", async () => {
    await chaca.export(DATA, {
      location: EXPORT_ROUTE,
      filename: FILE_NAME,
      format: "yaml",
    });
  });

  it("Python", async () => {
    await chaca.export(DATA, {
      location: EXPORT_ROUTE,
      filename: FILE_NAME,
      format: "python",
    });
  });
});
