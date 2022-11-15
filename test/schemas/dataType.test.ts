import { schemas } from "../../src";

describe("#DataType Tests", () => {
  describe("intNumber test", () => {
    it("Passing a max value (5). Should return a int number less than 5", () => {
      const value = schemas.dataType.int().getValue({ max: 5 });
      expect(value <= 5 && Number.isInteger(value)).toBe(true);
    });

    it("passing 20 as max and min argument. Sould return 20", () => {
      const value = schemas.dataType.int().getValue({ max: 20, min: 20 });
      expect(value === 20 && Number.isInteger(value)).toBe(true);
    });

    it("Passing min: 0 && max: 100. Should return an int number between 0 and 100", () => {
      const value = schemas.dataType.int().getValue({ max: 100, min: 0 });
      expect(value <= 100 && value >= 0 && Number.isInteger(value)).toBe(true);
    });

    it("Passing min: -10 && max: -1. Should return an int number between -1 and -10", () => {
      const value = schemas.dataType.int().getValue({ max: -1, min: -10 });
      expect(value <= -1 && value >= -10 && Number.isInteger(value)).toBe(true);
    });
  });

  describe("alphaNumeric test", () => {
    const validate = (string: string, banned: string[]): boolean => {
      let val = true;
      for (let i = 0; i < string.length && val; i++) {
        for (const v of banned) {
          if (v === string[i]) val = false;
        }
      }
      return val;
    };

    it("no arguments pass. Sould return an string with the alphanumeric", () => {
      const val = schemas.dataType.alphaNumeric().getValue();
      expect(typeof val === "string").toBe(true);
    });

    it("pass 10 as lenght argument. Should return alphanumeric with size 10", () => {
      const val = schemas.dataType.alphaNumeric().getValue({ length: 10 });
      expect(val.length === 10).toBe(true);
    });

    it("pass 'b' as banned argument. Should return an string without b", () => {
      const val = schemas.dataType
        .alphaNumeric()
        .getValue({ length: 10, banned: "b" });
      expect(validate(val, ["b"])).toBe(true);
    });

    it("pass ['b', 'a', 'c', 'd', 'e'] as banned argument. Should return an string without b", () => {
      const val = schemas.dataType.alphaNumeric().getValue({
        length: 10,
        banned: ["a", "b", "c", "d", "e"],
        case: "lower",
      });
      expect(validate(val, ["a", "b", "c", "d", "e"])).toBe(true);
    });
  });
});
