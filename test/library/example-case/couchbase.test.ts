import { describe } from "vitest";
import { ExampleCaseTest } from "./core";
import { COUCHBASE_DATASET } from "./core/definitions/couchbase";

const tester = new ExampleCaseTest(COUCHBASE_DATASET, "couchbase", "couchbase");

describe("Couchbase case", () => {
  tester.execute();
});
