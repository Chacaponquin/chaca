import { describe, expect, it } from "vitest";
import { modules } from "../../../src";

describe("date modules", () => {
  it("date.month", () => {
    expect(modules.date.constants.months).include(modules.date.month());
  });

  it("date.weekDay", () => {
    expect(modules.date.constants.weekDays).include(modules.date.weekDay());
  });
});
