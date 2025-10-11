import { describe, expect, it } from "vitest";
import { modules } from "../../../src";
import { nonStandardExpressions } from "../../../src/modules/system/constants/non-standard-cron-expressions";

describe("system.cron", () => {
  it("with no arguments should return a cron standard value without year", () => {
    const value = modules.system.cron({});

    expect(value.split(" ")).toHaveLength(5);
  });

  it("includeNonStandard = false. should return a standard cron value without a year", () => {
    const value = modules.system.cron({ includeNonStandard: false });

    expect(value.split(" ")).toHaveLength(5);
  });

  it("includeNonStandard = true. should return a standard cron value without a year", () => {
    const value = modules.system.cron({ includeNonStandard: true });

    expect(nonStandardExpressions).toContain(value);
  });

  it("includeYear = false. should return a standard cron value without a year", () => {
    const value = modules.system.cron({ includeYear: false });

    expect(value.split(" ")).toHaveLength(5);
  });

  it("includeYear = true. should return a standard cron value with a year", () => {
    const value = modules.system.cron({ includeYear: true });

    expect(value.split(" ")).toHaveLength(6);
  });

  it("includeYear = true & includeNonStandard = true. should return a standard cron value with a year", () => {
    const value = modules.system.cron({
      includeYear: true,
      includeNonStandard: true,
    });

    expect(value.split(" ")).toHaveLength(6);
  });
});
