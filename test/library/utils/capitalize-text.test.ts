import { chaca } from "../../../src";

describe("# capitalize Util Test", () => {
  it("Passing undefined as argument. Should return an error", () => {
    expect(() => {
      chaca.utils.camelCase(undefined!);
    }).toThrow(TypeError);
  });

  it("With 'hi there friend' as argument. Should return 'Hi There Friend'", () => {
    const val = chaca.utils.capitalize("hi there friend");
    expect(val === "Hi There Friend").toBe(true);
  });

  it("With ' helloWorld' as argument. Should return ' HelloWorld'", () => {
    const val = chaca.utils.capitalize(" helloWorld");
    expect(val === " HelloWorld").toBe(true);
  });
});
