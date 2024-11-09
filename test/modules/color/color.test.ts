import { describe, expect, it } from "vitest";
import { modules } from "../../../src";

describe("# Color modules tests", () => {
  it("color.human", () => {
    const value = modules.color.human();

    expect(modules.color.constants.human).include(value);
  });

  it("color.cssSupportedFunction", () => {
    const value = modules.color.cssSupportedFunction();

    expect(modules.color.constants.cssFunctions).include(value);
  });

  it("color.cssSupportedSpace", () => {
    const value = modules.color.cssSupportedSpace();

    expect(modules.color.constants.cssSpaces).include(value);
  });
});
