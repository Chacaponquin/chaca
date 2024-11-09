import { describe, expect, it } from "vitest";
import { modules } from "../../../src";

describe("word modules", () => {
  it("word.adjective", () => {
    expect(modules.word.constants.words.en.adjectives).include(
      modules.word.adjective(),
    );
  });

  it("word.conjuction", () => {
    expect(modules.word.constants.words.en.conjuctions).include(
      modules.word.conjuction(),
    );
  });

  it("word.interjection", () => {
    expect(modules.word.constants.words.en.interjections).include(
      modules.word.interjection(),
    );
  });

  it("word.preposition", () => {
    expect(modules.word.constants.words.en.prepositions).include(
      modules.word.preposition(),
    );
  });

  it("word.adverb", () => {
    expect(modules.word.constants.words.en.adverbs).include(
      modules.word.adverb(),
    );
  });

  it("word.verb", () => {
    expect(modules.word.constants.words.en.verbs).include(modules.word.verb());
  });

  it("word.noun", () => {
    expect(modules.word.constants.words.en.nouns).include(modules.word.noun());
  });
});
