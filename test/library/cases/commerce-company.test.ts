import { chaca, Dataset } from "../../../src";
import { COMMERCE_COMPANY_SCHEMAS } from "../../utils/cases/commerce-company";
import { describe, beforeAll, expect, it } from "vitest";

const EXPORT_ROUTE = "./data/cases/commerce_company";
const FILE_NAME = "caseCommerceCompany";

describe("# Commerce Company Case Test", () => {
  let CASE_DATA: any;
  let CASE: Dataset;

  beforeAll(() => {
    CASE = chaca.dataset(COMMERCE_COMPANY_SCHEMAS);
    CASE_DATA = CASE.generate();
  });

  it("JSON", async () => {
    await chaca.export(CASE_DATA, {
      filename: FILE_NAME,
      format: "json",
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

  it("Typescrpt", async () => {
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

  it("Yaml", async () => {
    await chaca.export(CASE_DATA, {
      filename: FILE_NAME,
      format: "yaml",
      location: EXPORT_ROUTE,
    });
  });

  it("Postgresql", async () => {
    await CASE.export({
      filename: FILE_NAME,
      format: "postgresql",
      location: EXPORT_ROUTE,
      verbose: false,
    });
  });

  it("Python", async () => {
    await CASE.export({
      filename: FILE_NAME,
      format: "python",
      location: EXPORT_ROUTE,
      verbose: false,
    });
  });
});
