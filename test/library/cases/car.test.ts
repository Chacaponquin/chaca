import { chaca } from "../../../src";
import { CASE_SCHEMAS } from "../utils/cases/car";

const EXPORT_ROUTE = "./data/cases/car";
const FILE_NAME = "caseCar";

describe("# Car Case Test", () => {
  let CAR_CASE_DATA: any;

  beforeAll(() => {
    CAR_CASE_DATA = chaca.multiGenerate(CASE_SCHEMAS);
  });

  it("JSON", () => {
    chaca
      .export(CAR_CASE_DATA, {
        location: EXPORT_ROUTE,
        fileName: FILE_NAME,
        format: "json",
      })
      .then((s) => expect(typeof s).toBe("string"));
  });

  it("Javascript", () => {
    chaca
      .export(CAR_CASE_DATA, {
        location: EXPORT_ROUTE,
        fileName: FILE_NAME,
        format: "javascript",
      })
      .then((s) => expect(typeof s).toBe("string"));
  });

  it("Yaml", async () => {
    await chaca.export(CAR_CASE_DATA, {
      location: EXPORT_ROUTE,
      fileName: FILE_NAME,
      format: "yaml",
    });
  });

  it("Typescript", () => {
    chaca
      .export(CAR_CASE_DATA, {
        location: EXPORT_ROUTE,
        fileName: FILE_NAME,
        format: "typescript",
      })
      .then((s) => expect(typeof s).toBe("string"));
  });

  it("Java", () => {
    chaca
      .export(CAR_CASE_DATA, {
        location: EXPORT_ROUTE,
        fileName: FILE_NAME,
        format: "java",
      })
      .then((s) => expect(typeof s).toBe("string"));
  });

  it("SQL", () => {
    chaca
      .toSQL(CASE_SCHEMAS, {
        fileName: FILE_NAME,
        location: EXPORT_ROUTE,
      })
      .then((s) => expect(typeof s).toBe("string"));
  });
});
