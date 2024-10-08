import { chaca } from "../../../src";
import { describe, expect, it } from "vitest";

describe("# CapitalizeWord util Test", () => {
  it("With 'hi there' as argument. Should return 'Hi there'", () => {
    const val = chaca.utils.capitalizeWord("hi there");
    expect(val === "Hi there").toBe(true);
  });

  it("With 'hello' as argument. Should return 'Hello'", () => {
    const val = chaca.utils.capitalizeWord("hello");
    expect(val === "Hello").toBe(true);
  });

  it("With 'HELLO_THERE'. Should return 'HELLO_THERE'", () => {
    const val = chaca.utils.capitalizeWord("HELLO_THERE");
    expect(val).toBe("HELLO_THERE");
  });
});
