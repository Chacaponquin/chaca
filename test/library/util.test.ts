import mocha from "mocha";
import { expect } from "chai";
import { PrivateUtils } from "../../src/utils/helpers/PrivateUtils";
import { ChacaError } from "../../src/errors/ChacaError";

describe("#Util Tests", () => {
  context("capitalizaText test", () => {
    it("passing undefined as argument. Should return an error", () => {
      try {
        const value = PrivateUtils.capitalizeText(undefined!);
      } catch (error) {
        expect(error).to.be.instanceOf(ChacaError);
      }
    });

    it("passing 'Hello World' as argument. Should return 'helloWorld'", () => {
      const value = PrivateUtils.capitalizeText("Hello World");
      expect(value).to.be.equal("helloWorld");
    });
  });

  context("replaceSymbols test", () => {
    it("pass undefined as argument. Should return an empty string", () => {
      const val = PrivateUtils.replaceSymbols(undefined!);
      expect(val === "").to.be.true;
    });

    it("pass only #. Should return a string with only numbers", () => {
      const val = PrivateUtils.replaceSymbols("#####");

      let is = true;
      for (let i = 0; i < val.length && is; i++) {
        if (isNaN(Number(val[i]))) is = false;
      }

      expect(is).to.be.true;
    });
  });
});
