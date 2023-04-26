import { chaca } from "../../../src";
import { CAR_CASE_DATA } from "../utils/cases/car";

const EXPORT_ROUTE = "./data/cases/car";
const FILE_NAME = "caseCar";

describe("# Car Case Test", () => {
  it("JSON", () => {
    chaca
      .export(CAR_CASE_DATA, {
        location: EXPORT_ROUTE,
        fileName: FILE_NAME,
        format: "typescript",
      })
      .then((s) => expect(typeof s).toBe("string"));
  });
});
