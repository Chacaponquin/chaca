import { chaca } from "../../../src";
import { CAR_CASE_DATA, CASE_SCHEMAS } from "../utils/cases/car";

const EXPORT_ROUTE = "./data/cases/car";
const FILE_NAME = "caseCar";

describe("# Car Case Test", () => {
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

  it("Yaml", () => {
    chaca
      .export(CAR_CASE_DATA, {
        location: EXPORT_ROUTE,
        fileName: FILE_NAME,
        format: "yaml",
      })
      .then((s) => expect(typeof s).toBe("string"));
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
