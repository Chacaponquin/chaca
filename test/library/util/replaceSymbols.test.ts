import { chaca } from "../../../src";

describe("# ReplaceSymbols Util Test", () => {
  it("Pass undefined as argument. Should return an empty string", () => {
    const val = chaca.utils.replaceSymbols(undefined!);
    expect(val === "").toBe(true);
  });

  it("Pass only #. Should return a string with only numbers", () => {
    const val = chaca.utils.replaceSymbols("#####");

    let is = true;
    for (let i = 0; i < val.length && is; i++) {
      if (isNaN(Number(val[i]))) is = false;
    }

    expect(is).toBe(true);
  });
});
