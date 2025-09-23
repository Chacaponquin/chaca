import { describe } from "vitest";
import { ExampleCaseTest } from "./core/example-case";
import { UNIVERSITY_DATASET } from "./core/definitions/university/definition";

describe("University case", () => {
  const example = new ExampleCaseTest({
    dataset: UNIVERSITY_DATASET,
    filename: "university",
    location: "university",
  });

  example.execute();
});
