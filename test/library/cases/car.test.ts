import { chaca, Dataset } from "../../../src";
import { CASE_SCHEMAS } from "../../utils/cases/car";
import { describe, beforeAll, expect, it } from "vitest";

const EXPORT_ROUTE = "./data/cases/car";
const FILE_NAME = "caseCar";
const FILE_NAME_FROM_SCHEMAS = FILE_NAME + "FromSchemas";

describe("# Car Case Test", () => {
  let CAR_CASE: Dataset;
  let DATA: any;

  beforeAll(() => {
    CAR_CASE = chaca.dataset(CASE_SCHEMAS);
    DATA = CAR_CASE.generate();
  });

  it("Creation", () => {
    expect(DATA).toHaveProperty("Pay_Method");
    expect(DATA).toHaveProperty("Brand");
    expect(DATA).toHaveProperty("Model");
    expect(DATA).toHaveProperty("Car");
    expect(DATA).toHaveProperty("Driver");
    expect(DATA).toHaveProperty("Tourist");
    expect(DATA).toHaveProperty("Contract");
  });

  it("JSON Simple Export", async () => {
    await chaca.export(DATA, {
      location: EXPORT_ROUTE,
      filename: FILE_NAME,
      format: "json",
    });
  });

  it("CSV Simple Export", async () => {
    await CAR_CASE.export({
      location: EXPORT_ROUTE,
      filename: FILE_NAME_FROM_SCHEMAS + "CSV",
      format: { ext: "csv", zip: true },
      verbose: false,
    });
  });

  it("Javascript Simple Export", async () => {
    await chaca.export(DATA, {
      location: EXPORT_ROUTE,
      filename: FILE_NAME,
      format: "javascript",
    });
  });

  it("Yaml Simple Export", async () => {
    await chaca.export(DATA, {
      location: EXPORT_ROUTE,
      filename: FILE_NAME,
      format: "yaml",
    });
  });

  it("Typescript Simple Export", async () => {
    await chaca.export(DATA, {
      location: EXPORT_ROUTE,
      filename: FILE_NAME,
      format: "typescript",
    });
  });

  it("Java Simple Export", async () => {
    await chaca.export(DATA, {
      location: EXPORT_ROUTE,
      filename: FILE_NAME,
      format: { ext: "java", zip: true },
    });
  });

  it("Python Simple Export", async () => {
    await chaca.export(DATA, {
      location: EXPORT_ROUTE,
      filename: FILE_NAME,
      format: "python",
    });
  });

  it("Postgresql Export From Schemas", async () => {
    await CAR_CASE.export({
      filename: FILE_NAME,
      location: EXPORT_ROUTE,
      format: "postgresql",
      verbose: false,
    });
  });

  it("Java Export From Schemas", async () => {
    await CAR_CASE.export({
      filename: FILE_NAME_FROM_SCHEMAS,
      location: EXPORT_ROUTE,
      format: { ext: "java", zip: true },
      verbose: false,
    });
  });

  it("Python Export From Schemas", async () => {
    await CAR_CASE.export({
      filename: FILE_NAME_FROM_SCHEMAS,
      location: EXPORT_ROUTE,
      format: "python",
      verbose: false,
    });
  });
});
