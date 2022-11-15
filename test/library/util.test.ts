import { chaca } from "../../src";
import { ChacaError } from "../../src/errors/ChacaError";

describe("#Util Tests", () => {
  describe("capitalizaText test", () => {
    it("passing undefined as argument. Should return an error", () => {
      try {
        const value = chaca.utils.camelCaseText(undefined!);
      } catch (error) {
        expect(error instanceof ChacaError).toBe(true);
      }
    });

    it("passing 'Hello World' as argument. Should return 'helloWorld'", () => {
      const value = chaca.utils.camelCaseText("Hello World");
      expect(value).toBe("helloWorld");
    });
  });

  describe("replaceSymbols test", () => {
    it("pass undefined as argument. Should return an empty string", () => {
      const val = chaca.utils.replaceSymbols(undefined!);
      expect(val === "").toBe(true);
    });

    it("pass only #. Should return a string with only numbers", () => {
      const val = chaca.utils.replaceSymbols("#####");

      let is = true;
      for (let i = 0; i < val.length && is; i++) {
        if (isNaN(Number(val[i]))) is = false;
      }

      expect(is).toBe(true);
    });
  });

  describe("capitalizeCamelCase test", () => {
    it("Pass 'Hello World'. Should return 'HelloWorld'", () => {
      const val = chaca.utils.capitalizeCamelCase("Hello World");
      expect(val === "HelloWorld").toBe(true);
    });
  });

  describe("capitalizeWord test", () => {
    it("With 'hi there' as argument. Should return 'Hi there'", () => {
      const val = chaca.utils.capitalizeWord("hi there");
      expect(val === "Hi there").toBe(true);
    });

    it("With 'hello' as argument. Should return 'Hello'", () => {
      const val = chaca.utils.capitalizeWord("hello");
      expect(val === "Hello").toBe(true);
    });
  });

  describe("capitalizeWord test", () => {
    it("With 'hi there friend' as argument. Should return 'Hi There Friend'", () => {
      const val = chaca.utils.capitalizeText("hi there friend");
      expect(val === "Hi There Friend").toBe(true);
    });

    it("With ' helloWorld' as argument. Should return ' HelloWorld'", () => {
      const val = chaca.utils.capitalizeText(" helloWorld");
      expect(val === " HelloWorld").toBe(true);
    });
  });
});
