import { describe } from "vitest";
import { ExampleCaseTest } from "./core";
import { BASEBALL_DATASET } from "./core/definitions/baseball";

const tester = new ExampleCaseTest(BASEBALL_DATASET, "baseball", "baseball");

describe("Baseball case", () => {
  tester.execute();
});
