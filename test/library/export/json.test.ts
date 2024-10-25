import { describe } from "vitest";
import { ExtensionTester } from "./core/tester";

const tester = new ExtensionTester("json");

describe("Json", () => {
  tester.execute({ arrays: {}, object: {}, primitives: {} });
});
