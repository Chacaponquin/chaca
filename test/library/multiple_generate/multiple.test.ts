import { ChacaError, TryRefANoKeyFieldError } from "../../../src";
import { REF_REF_VALUE_DATA } from "./utils/ref-ref/schemas";
import { REPEAT_NAMES_DATA } from "./utils/repeatNames/schemas";

describe("Multiple Generation Test", () => {
  describe("Incorrect declaration of reference field", () => {
    it("Repeat names in the declaration. Should throw an error", () => {
      expect(REPEAT_NAMES_DATA).toThrowError(ChacaError);
    });

    it("Trying reference a reference field.", () => {
      expect(REF_REF_VALUE_DATA).toThrowError(TryRefANoKeyFieldError);
    });
  });
});
