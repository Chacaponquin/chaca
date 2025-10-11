import { describe, expect, it } from "vitest";
import { modules } from "../../../src";

describe("date.month", () => {
  it("should return a constant month", () => {
    expect(modules.date.constants.months).include(modules.date.month());
  });
});
