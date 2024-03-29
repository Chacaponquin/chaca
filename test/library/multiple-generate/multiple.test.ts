import { ChacaError, TryRefANoKeyFieldError } from "../../../src";
import { REF_REF_VALUE_DATA } from "./utils/ref-ref/schemas";
import { REPEAT_NAMES_DATA } from "./utils/repeat-names/schemas";

describe("# Multiple Generation Test", () => {
  describe("Incorrect declaration of reference field", () => {
    it("Repeat names in the declaration. Should throw an error", () => {
      expect(REPEAT_NAMES_DATA).toThrow(ChacaError);
    });

    it("Trying reference a reference field. Should throw an error", () => {
      expect(REF_REF_VALUE_DATA).toThrow(TryRefANoKeyFieldError);
    });
  });
});
