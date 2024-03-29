import { chaca } from "../../../src";
import { CASE_SCHEMAS } from "../../utils/cases/car";

const EXPORT_ROUTE = "./data/cases/car";
const FILE_NAME = "caseCar";
const FILE_NAME_FROM_SCHEMAS = FILE_NAME + "FromSchemas";

describe("# Car Case Test", () => {
  let CAR_CASE_DATA: any;

  beforeAll(() => {
    CAR_CASE_DATA = chaca.multiGenerate(CASE_SCHEMAS, { verbose: false });
  });

  it("Creation", () => {
    const DATA = chaca.multiGenerate(CASE_SCHEMAS, { verbose: false });
    expect(DATA).toHaveProperty("Pay_Method");
    expect(DATA).toHaveProperty("Brand");
    expect(DATA).toHaveProperty("Model");
    expect(DATA).toHaveProperty("Car");
    expect(DATA).toHaveProperty("Driver");
    expect(DATA).toHaveProperty("Tourist");
    expect(DATA).toHaveProperty("Contract");
  });

  it("JSON Simple Export", async () => {
    await chaca.export(CAR_CASE_DATA, {
      location: EXPORT_ROUTE,
      fileName: FILE_NAME,
      format: "json",
    });
  });

  it("CSV Simple Export", async () => {
    await chaca.exportFromSchemas(
      CASE_SCHEMAS,
      {
        location: EXPORT_ROUTE,
        fileName: FILE_NAME_FROM_SCHEMAS + "CSV",
        format: { ext: "csv", zip: true },
      },
      { verbose: false },
    );
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
      format: { ext: "java", zip: true },
    });
  });

  it("Python Simple Export", async () => {
    await chaca.export(CAR_CASE_DATA, {
      location: EXPORT_ROUTE,
      fileName: FILE_NAME,
      format: "python",
    });
  });

  it("Postgresql Export From Schemas", async () => {
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
        format: { ext: "java", zip: true },
      },
      { verbose: false },
    );
  });

  it("Python Export From Schemas", async () => {
    await chaca.exportFromSchemas(
      CASE_SCHEMAS,
      {
        fileName: FILE_NAME_FROM_SCHEMAS,
        location: EXPORT_ROUTE,
        format: "python",
      },
      { verbose: false },
    );
  });
});
