import { describe } from "vitest";
import { ECOMMERCE_DATASET } from "./core/definitions/ecommerce";
import { ExampleCaseTest } from "./core";

const tester = new ExampleCaseTest(ECOMMERCE_DATASET, "ecommerce", "ecommerce");

describe("Ecommerce case", () => {
  tester.execute();
});
