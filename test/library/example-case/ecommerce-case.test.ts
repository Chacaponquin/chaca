import { describe } from "vitest";
import { ExampleCaseTest } from "./core/example-case";
import { ECOMMERCE_DATASET } from "./core/definitions/ecommerce/definition";

const example = new ExampleCaseTest(
  ECOMMERCE_DATASET,
  "ecommerce",
  "ecommerce",
);

describe("Ecommerce case", () => {
  example.execute();
});
