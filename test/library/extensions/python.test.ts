import { describe } from "vitest";
import { ExtensionTester } from "./core/tester";

const tester = new ExtensionTester("python");

describe("Python", () => {
  tester.execute({ arrays: {}, object: {}, primitives: {} });
});
