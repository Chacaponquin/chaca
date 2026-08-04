import { describe, expect, it } from "vitest";
import { modules } from "../../../src";

const ALL_EMOJIS = Object.values(modules.internet.constants.emojis).flat();

describe("internet.emoji", () => {
  it("emoji = 'food'. should return an emoji from the food category", () => {
    const value = modules.internet.emoji({ emoji: "food" });

    expect(modules.internet.constants.emojis.food).toContain(value);
  });

  it("no arguments. should return an emoji from any category", () => {
    const value = modules.internet.emoji();

    expect(ALL_EMOJIS).toContain(value);
  });

  it("invalid category. should still return an emoji from the full set", () => {
    const value = modules.internet.emoji({ emoji: "not-a-category" as any });

    expect(ALL_EMOJIS).toContain(value);
  });
});
