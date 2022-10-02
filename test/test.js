var expect = require("chai").expect;

function sum(a, b) {
  if (!a || !b) return 0;
  else return a + b;
}

describe("#sum()", function () {
  context("without arguments", function () {
    it("should return 0", function () {
      expect(sum()).to.equal(0);
    });
  });
});
