import { modules } from "../../../src";

describe("# Datatype AlphaNumeric test", () => {
  const validate = (string: string, banned: string[]): boolean => {
    let val = true;
    for (let i = 0; i < string.length && val; i++) {
      for (const v of banned) {
        if (v === string[i]) val = false;
      }
    }
    return val;
  };

  it("No arguments pass. Sould return an string with the alphanumeric", () => {
    const val = modules.datatype.alphaNumeric().getValue();
    expect(typeof val === "string").toBe(true);
  });

  it("Pass 10 as lenght argument. Should return alphanumeric with size 10", () => {
    const val = modules.datatype.alphaNumeric().getValue({ length: 10 });
    expect(val.length === 10).toBe(true);
  });

  it("Pass 'b' as banned argument. Should return an string without b", () => {
    const val = modules.datatype
      .alphaNumeric()
      .getValue({ length: 10, banned: "b" });
    expect(validate(val, ["b"])).toBe(true);
  });

  it("Pass ['b', 'a', 'c', 'd', 'e'] as banned argument. Should return an string without b", () => {
    const val = modules.datatype.alphaNumeric().getValue({
      length: 10,
      banned: ["a", "b", "c", "d", "e"],
      case: "lower",
    });
    expect(validate(val, ["a", "b", "c", "d", "e"])).toBe(true);
  });
});
