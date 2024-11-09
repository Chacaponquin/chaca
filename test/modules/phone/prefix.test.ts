import { describe, expect, it } from "vitest";
import { modules } from "../../../src";

describe("phone.prefix", () => {
  it("no arguments. should return an prefix", () => {
    const value = modules.phone.prefix();
    expect(modules.phone.constants.phonePrefixs).include(value);
  });
});
