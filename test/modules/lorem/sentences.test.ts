import { describe, expect, it } from "vitest";
import { modules } from "../../../src";

describe("lorem.sentences", () => {
  it("no arguments. returns 3 sentences", () => {
    const value = modules.lorem.sentences();
    const sentences = value.split(".").filter((s) => s.trim().length > 0);

    expect(sentences).toHaveLength(3);
  });

  it("sentencesCount: 4. returns exactly 4 sentences", () => {
    const value = modules.lorem.sentences({ sentencesCount: 4 });
    const sentences = value.split(".").filter((s) => s.trim().length > 0);

    expect(sentences).toHaveLength(4);
  });

  it("separator is not inserted between sentences (implementation joins them with spaces)", () => {
    const value = modules.lorem.sentences({
      sentencesCount: 3,
      separator: "|",
    });

    expect(value).not.toContain("|");
    expect(value.match(/\./g) ?? []).toHaveLength(3);
  });
});
