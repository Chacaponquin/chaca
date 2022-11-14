import { PrivateUtils } from "../../src/utils/helpers/PrivateUtils";
import { ChacaError } from "../../src/errors/ChacaError";

describe("#Util Tests", () => {
  describe("capitalizaText test", () => {
    it("passing undefined as argument. Should return an error", () => {
      try {
        const value = PrivateUtils.camelCaseText(undefined!);
      } catch (error) {
        expect(error instanceof ChacaError).toBe(true);
      }
    });

    it("passing 'Hello World' as argument. Should return 'helloWorld'", () => {
      const value = PrivateUtils.camelCaseText("Hello World");
      expect(value).toBe("helloWorld");
    });
  });

  describe("replaceSymbols test", () => {
    it("pass undefined as argument. Should return an empty string", () => {
      const val = PrivateUtils.replaceSymbols(undefined!);
      expect(val === "").toBe(true);
    });

    it("pass only #. Should return a string with only numbers", () => {
      const val = PrivateUtils.replaceSymbols("#####");

      let is = true;
      for (let i = 0; i < val.length && is; i++) {
        if (isNaN(Number(val[i]))) is = false;
      }

      expect(is).toBe(true);
    });
  });
});
