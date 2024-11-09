import { describe } from "vitest";
import { ExampleCaseTest } from "./core";
import { SCHOOL_DATASET } from "./core/definitions/school";

const tester = new ExampleCaseTest(SCHOOL_DATASET, "school", "school");

describe("School case", () => {
  tester.execute();
});
