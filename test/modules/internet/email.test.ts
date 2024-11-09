import { modules } from "../../../src";
import { describe, expect, it } from "vitest";

describe("internet.email", () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  it("no arguments. should return an email", () => {
    const value = modules.internet.email();

    expect(emailRegex.test(value)).toBe(true);
  });
});
