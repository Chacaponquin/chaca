import { describe, expect, it } from "vitest";
import { modules } from "../../../src";

const cases = [
  ["adjective", "adjectives"],
  ["conjuction", "conjuctions"],
  ["interjection", "interjections"],
  ["preposition", "prepositions"],
  ["adverb", "adverbs"],
  ["verb", "verbs"],
  ["noun", "nouns"],
] as const;

describe("word modules", () => {
  it.each(cases)("word.%s. default language is 'en'", (method, category) => {
    expect(modules.word.constants.words.en[category]).include(
      modules.word[method](),
    );
  });

  it.each(cases)("word.%s. language: 'es'", (method, category) => {
    expect(modules.word.constants.words.es[category]).include(
      modules.word[method]({ language: "es" }),
    );
  });
});
