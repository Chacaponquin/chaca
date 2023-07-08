import { chaca } from "../../../src";

describe("# CapitalizeCamelCase Util Test", () => {
  it("Pass 'Hello World'. Should return 'HelloWorld'", () => {
    const val = chaca.utils.capitalizeCamelCase("Hello World");
    expect(val === "HelloWorld").toBe(true);
  });

  it("With 'HELLO_THERE'. Should return 'HelloThere'", () => {
    const val = chaca.utils.capitalizeCamelCase("HELLO_THERE");
    expect(val).toBe("HelloThere");
  });
});
