import { describe } from "vitest";
import { ExampleCaseTest } from "./core";
import { SOCCER_TOURNAMENTE_DATASET } from "./core/definitions/soccer";

const tester = new ExampleCaseTest(
  SOCCER_TOURNAMENTE_DATASET,
  "soccer",
  "soccer",
);

describe("Soccer case", () => {
  tester.execute();
});
