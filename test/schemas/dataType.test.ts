import mocha from "mocha";
import { expect } from "chai";
import { PrivateUtils } from "../../src/utils/helpers/PrivateUtils";

describe("#DataType Tests", () => {
  context("intNumber test", () => {
    it("Passing a max value (5). Should return a int number less than 5", () => {
      const value = PrivateUtils.intNumber({ max: 5 });
      expect(value <= 5 && Number.isInteger(value)).to.be.true;
    });

    it("Passing min: 0 && max: 100. Should return an int number between 0 and 100", () => {
      const value = PrivateUtils.intNumber({ max: 100, min: 0 });
      expect(value <= 100 && value >= 0 && Number.isInteger(value)).to.be.true;
    });

    it("Passing min: -10 && max: -1. Should return an int number between -1 and -10", () => {
      const value = PrivateUtils.intNumber({ max: -1, min: -10 });
      expect(value <= -1 && value >= -10 && Number.isInteger(value)).to.be.true;
    });
  });
});
