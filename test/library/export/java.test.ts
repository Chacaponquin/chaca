import { describe } from "vitest";
import { ExtensionTester } from "./core/tester";

const tester = new ExtensionTester("java");

describe("Java", () => {
  tester.execute({
    arrays: { simple: true, matrix: true },
    object: { simple: true },
    primitives: {
      bigint: true,
      boolean: true,
      date: true,
      float: true,
      int: true,
      nan: true,
      null: true,
      string: true,
      undefined: true,
    },
  });
});
