import { chaca } from "../../../src";
import { CASE_SCHEMAS } from "../../utils/cases/car";
import { createTestFolder } from "../../utils/functions/folder";

const EXPORT_ROUTE = "./data/cases/car";
const FILE_NAME = "caseCar";
const FILE_NAME_FROM_SCHEMAS = FILE_NAME + "FromSchemas";

describe("# Car Case Test", () => {
  let CAR_CASE_DATA: any;

  beforeAll(() => {
    createTestFolder("cases/car");

    CAR_CASE_DATA = chaca.multiGenerate(CASE_SCHEMAS, { verbose: false });
  });

  it("Creation", () => {
    const DATA = chaca.multiGenerate(CASE_SCHEMAS, { verbose: false });
    expect(DATA).toHaveProperty("Pay_Method");
    expect(DATA).toHaveProperty("Situation");
    expect(DATA).toHaveProperty("Category");
    expect(DATA).toHaveProperty("Country");
    expect(DATA).toHaveProperty("Brand");
    expect(DATA).toHaveProperty("Model");
    expect(DATA).toHaveProperty("Car");
    expect(DATA).toHaveProperty("Driver");
    expect(DATA).toHaveProperty("Turist");
    expect(DATA).toHaveProperty("Contract");
  });

  it("JSON Simple Export", async () => {
    await chaca.export(CAR_CASE_DATA, {
      location: EXPORT_ROUTE,
      fileName: FILE_NAME,
      format: "json",
    });
  });

  it("Javascript Simple Export", async () => {
    await chaca.export(CAR_CASE_DATA, {
      location: EXPORT_ROUTE,
      fileName: FILE_NAME,
      format: "javascript",
    });
  });

  it("Yaml Simple Export", async () => {
    await chaca.export(CAR_CASE_DATA, {
      location: EXPORT_ROUTE,
      fileName: FILE_NAME,
      format: "yaml",
    });
  });

  it("Typescript Simple Export", async () => {
    await chaca.export(CAR_CASE_DATA, {
      location: EXPORT_ROUTE,
      fileName: FILE_NAME,
      format: "typescript",
    });
  });

  it("Java Simple Export", async () => {
    await chaca.export(CAR_CASE_DATA, {
      location: EXPORT_ROUTE,
      fileName: FILE_NAME,
      format: "java",
    });
  });

  it("SQL Export From Schemas", async () => {
    await chaca.exportFromSchemas(
      CASE_SCHEMAS,
      {
        fileName: FILE_NAME,
        location: EXPORT_ROUTE,
        format: "postgresql",
      },
      { verbose: false },
    );
  });

  it("Java Export From Schemas", async () => {
    await chaca.exportFromSchemas(
      CASE_SCHEMAS,
      {
        fileName: FILE_NAME_FROM_SCHEMAS,
        location: EXPORT_ROUTE,
        format: "java",
      },
      { verbose: false },
    );
  });
});
