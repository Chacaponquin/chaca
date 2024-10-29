import { chaca, ChacaError } from "../../../src";
import { describe, expect, it } from "vitest";

describe("util.replaceSymbols", () => {
  it("argument = #####. Should return a string with only numbers", () => {
    const val = chaca.utils.replaceSymbols("#####");

    let is = true;
    for (let i = 0; i < val.length && is; i++) {
      if (Number.isNaN(Number(val[i]))) {
        is = false;
      }
    }

    expect(is).toBe(true);
  });

  describe("symbols argument", () => {
    it("symbols = undefined. should replace symbols with default rules", () => {
      const value = chaca.utils.replaceSymbols("foo", { symbols: undefined });

      expect(value).toBe("foo");
    });

    it("symbols = {}. should replace symbols with default rules", () => {
      const value = chaca.utils.replaceSymbols("foo", { symbols: undefined });

      expect(value).toBe("foo");
    });

    it("symbols = { 'n': [] }. should throw an error", () => {
      expect(() =>
        chaca.utils.replaceSymbols("n", { symbols: { n: [] } }),
      ).toThrow(ChacaError);
    });

    it("text='nnn' & symbols={ n: ['1'] }. should return '111'", () => {
      const value = chaca.utils.replaceSymbols("nnn", {
        symbols: { n: ["1"] },
      });

      expect(value).toEqual("111");
    });

    it("text = '###' & symbols = { '#': ['1'] }. should overwrite # symbol rules and return '111'", () => {
      const value = chaca.utils.replaceSymbols("###", {
        symbols: { "#": ["1"] },
      });

      expect(value).toBe("111");
    });
  });

  describe("banned argument", () => {
    it("banned = undefined. no values should be banned", () => {
      const value = chaca.utils.replaceSymbols("###", { banned: undefined });

      expect(value.split("").some((v) => Number.isNaN(Number(v)))).toBe(false);
    });

    it("banned = ['1', '4']. should return a result without 1 and 4", () => {
      const value = chaca.utils.replaceSymbols("########", {
        banned: ["1", "4"],
      });

      expect(value.split("")).not.include("1");
      expect(value.split("")).not.include("4");
    });

    it("banned = []. no values should be banned", () => {
      const value = chaca.utils.replaceSymbols("###", { banned: [] });

      expect(value.split("").some((v) => Number.isNaN(Number(v)))).toBe(false);
    });
  });

  describe("banned and symbols argument", () => {
    it("banned = ['1'] & symbols: { 'n': ['1'] }. should throw an error", () => {
      expect(() => {
        chaca.utils.replaceSymbols("nnn", {
          symbols: { n: ["1"] },
          banned: ["1"],
        });
      }).toThrow(ChacaError);
    });

    it("text = 'nnn' & banned = ['1', '3', '5'] & symbols = { 'n': ['1', '3', '5', '9'] }. should return '999'", () => {
      const value = chaca.utils.replaceSymbols("nnn", {
        banned: ["1", "3", "5"],
        symbols: { n: ["1", "3", "5", "9"] },
      });

      expect(value).toBe("999");
    });
  });
});
