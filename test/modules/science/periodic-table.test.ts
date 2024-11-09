import { describe, expect, it } from "vitest";
import { modules } from "../../../src";

describe("science.periodicTableElement", () => {
  it("no arguments. should return an element name", () => {
    const value = modules.science.periodicTableElement();

    expect(
      modules.science.constants.periodicTableElements.map((p) => p.name),
    ).include(value);
  });

  describe("type argument", () => {
    it("type = 'symbol'. should return an element symbol");
    const value = modules.science.periodicTableElement({ type: "symbol" });

    expect(
      modules.science.constants.periodicTableElements.map((p) => p.symbol),
    ).include(value);
  });
});
