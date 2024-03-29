import { chaca } from "../../../src";
import { COMMERCE_COMPANY_SCHEMAS } from "../../utils/cases/commerce_company";

const EXPORT_ROUTE = "./data/cases/commerce_company";
const FILE_NAME = "caseCommerceCompany";

describe("# Commerce Company Case Test", () => {
  let CASE_DATA: any;

  beforeAll(() => {
    CASE_DATA = chaca.multiGenerate(COMMERCE_COMPANY_SCHEMAS, {
      verbose: false,
    });
  });

  it("JSON", async () => {
    await chaca.export(CASE_DATA, {
      fileName: FILE_NAME,
      format: "json",
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

  it("Typescrpt", async () => {
    await chaca.export(CASE_DATA, {
      fileName: FILE_NAME,
      format: "typescript",
      location: EXPORT_ROUTE,
    });
  });

  it("Java", async () => {
    await chaca.export(CASE_DATA, {
      fileName: FILE_NAME,
      format: { ext: "java", zip: true },
      location: EXPORT_ROUTE,
    });
  });

  it("Yaml", async () => {
    await chaca.export(CASE_DATA, {
      fileName: FILE_NAME,
      format: "yaml",
      location: EXPORT_ROUTE,
    });
  });

  it("Postgresql", async () => {
    await chaca.exportFromSchemas(
      COMMERCE_COMPANY_SCHEMAS,
      {
        fileName: FILE_NAME,
        format: "postgresql",
        location: EXPORT_ROUTE,
      },
      { verbose: false },
    );
  });

  it("Python", async () => {
    await chaca.exportFromSchemas(
      COMMERCE_COMPANY_SCHEMAS,
      {
        fileName: FILE_NAME,
        format: "python",
        location: EXPORT_ROUTE,
      },
      { verbose: false },
    );
  });
});
