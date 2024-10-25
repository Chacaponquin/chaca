import { describe } from "vitest";
import { ExampleCaseTest } from "./core";
import { CAR_DATASET } from "./core/definitions/car";

const tester = new ExampleCaseTest(CAR_DATASET, "car", "car");

describe("Car case", () => {
  tester.execute();
});
