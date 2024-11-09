import { describe } from "vitest";
import { ExampleCaseTest } from "./core";
import { LIBRARY_DATASET } from "./core/definitions/library";

const tester = new ExampleCaseTest(LIBRARY_DATASET, "library", "library");

describe("Library case", () => {
  tester.execute();
});
