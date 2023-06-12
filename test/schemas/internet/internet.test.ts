import { schemas } from "../../../src";

describe("#InternetSchema test", () => {
  describe("password tests", () => {
    it("pass length: 10 as argument. Should return an password with length 10", () => {
      const val = schemas.internet.password().getValue({ length: 10 });
      expect(val.length === 10).toBe(true);
    });
  });
});
