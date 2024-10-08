import { chaca, Dataset } from "../../../src";
import { TOURNAMENT_SCHEMAS } from "../../utils/cases/tournament";
import { describe, beforeAll, expect, it } from "vitest";

const EXPORT_ROUTE = "./data/cases/tournament";
const FILE_NAME = "case-tournament";

describe("# Tournament case test", () => {
  let TOURNAMENT_CASE: Dataset;

  beforeAll(() => {
    TOURNAMENT_CASE = chaca.dataset(TOURNAMENT_SCHEMAS);
  });

  it("JSON", async () => {
    await TOURNAMENT_CASE.export({
      filename: FILE_NAME,
      format: "json",
      location: EXPORT_ROUTE,
    });
  });
});
