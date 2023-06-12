import { ChacaError, chaca } from "../../../src";

describe("# CapitalizeText Util Test", () => {
  it("Passing undefined as argument. Should return an error", () => {
    expect(() => {
      chaca.utils.camelCaseText(undefined!);
    }).toThrow(ChacaError);
  });

  it("Passing 'Hello World' as argument. Should return 'helloWorld'", () => {
    const value = chaca.utils.camelCaseText("Hello World");
    expect(value).toBe("helloWorld");
  });

  it("With 'hi there friend' as argument. Should return 'Hi There Friend'", () => {
    const val = chaca.utils.capitalizeText("hi there friend");
    expect(val === "Hi There Friend").toBe(true);
  });

  it("With ' helloWorld' as argument. Should return ' HelloWorld'", () => {
    const val = chaca.utils.capitalizeText(" helloWorld");
    expect(val === " HelloWorld").toBe(true);
  });
});
