import { CHDataUtils } from "../../utils/CHDataUtils";
import { SchemaField } from "../SchemaField";
import WORDS, { ILanguageWord } from "./constants";

type Languages = "es" | "es";

type WordProps = {
  language?: Languages;
};

export class WordSchema {
  adjective(args?: WordProps) {
    return new SchemaField<string, WordProps>(
      "adjective",
      (a) => CHDataUtils.oneOfArray(this.filterWords(a.language).adjectives),
      args || {},
    );
  }

  conjuction(args?: WordProps) {
    return new SchemaField<string, WordProps>(
      "conjuction",
      (a) => CHDataUtils.oneOfArray(this.filterWords(a.language).conjuctions),
      args || {},
    );
  }

  interjection(args?: WordProps) {
    return new SchemaField<string, WordProps>(
      "interjection",
      (a) => CHDataUtils.oneOfArray(this.filterWords(a.language).interjections),
      args || {},
    );
  }

  preposition(args?: WordProps) {
    return new SchemaField<string, WordProps>(
      "preposition",
      (a) => CHDataUtils.oneOfArray(this.filterWords(a.language).prepositions),
      args || {},
    );
  }

  adverb(args?: WordProps) {
    return new SchemaField<string, WordProps>(
      "adverb",
      (a) => CHDataUtils.oneOfArray(this.filterWords(a.language).adverbs),
      args || {},
    );
  }

  verb(args?: WordProps) {
    return new SchemaField<string, WordProps>(
      "verb",
      (a) => CHDataUtils.oneOfArray(this.filterWords(a.language).verbs),
      args || {},
    );
  }

  noun(args?: WordProps) {
    return new SchemaField<string, WordProps>(
      "noun",
      (a) => CHDataUtils.oneOfArray(this.filterWords(a.language).nouns),
      args || {},
    );
  }

  private filterWords(lan: Languages | undefined): ILanguageWord {
    if (typeof lan === "string") {
      const languageSelected = WORDS[lan];
      if (languageSelected) return languageSelected;
      else return WORDS["en"];
    } else return WORDS["en"];
  }
}
