import { describe } from "vitest";
import { ExtensionTester } from "./core/tester";

const tester = new ExtensionTester("typescript");

describe("Typescript", () => {
  tester.execute({ arrays: {}, object: {}, primitives: {} });
});
