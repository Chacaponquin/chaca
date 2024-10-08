import { modules } from "../../../src";
import { describe, expect, it } from "vitest";

describe("# Internet email tests", () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  it("Generate email with out arguments. Should return a valid argument", () => {
    const emails = Array.from({ length: 50 }).map(() =>
      modules.internet.email(),
    );

    expect(emails.every((e) => emailRegex.test(e) === true)).toBe(true);
  });
});
