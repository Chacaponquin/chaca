import { describe } from "vitest";
import { ExtensionTester } from "./core/tester";

const tester = new ExtensionTester("javascript");

describe("Javascript", () => {
  tester.execute({ arrays: {}, object: {}, primitives: {} });
});
