import { ChacaUtils } from "../../core/utils";
import { Module } from "../Module";
import WORDS, { ILanguageWord } from "./constants";

type Languages = "es" | "en";

type WordProps = {
  language?: Languages;
};

export class WordModule {
  private utils = new ChacaUtils();

  readonly constants = { words: WORDS };

  /**
   * Returns a adjective from a selected lenguage
   * @param args.language word language (`en` | `es`). Defaults `en`
   * @example modules.word.adjective() // Schema
   * @example modules.word.adjective().getValue() // 'clever'
   * @returns string
   */
  adjective(args?: WordProps) {
    return new Module<string, WordProps>(
      (a) => this.utils.oneOfArray(this.filterWords(a.language).adjectives),
      args || {},
    );
  }

  /**
   * Returns a conjuction from a selected lenguage
   * @param args.language word language (`en` | `es`). Defaults `en`
   * @example modules.word.conjuction() // Schema
   * @example modules.word.conjuction().getValue() // 'but'
   * @returns string
   */
  conjuction(args?: WordProps) {
    return new Module<string, WordProps>(
      (a) => this.utils.oneOfArray(this.filterWords(a.language).conjuctions),
      args || {},
    );
  }

  /**
   * Returns a interjection from a selected lenguage
   * @param args.language word language (`en` | `es`). Defaults `en`
   * @example modules.word.interjection() // Schema
   * @example modules.word.interjection().getValue() // 'hey!'
   * @returns string
   */
  interjection(args?: WordProps) {
    return new Module<string, WordProps>(
      (a) => this.utils.oneOfArray(this.filterWords(a.language).interjections),
      args || {},
    );
  }

  /**
   * Returns a preposition from a selected lenguage
   * @param args.language word language (`en` | `es`). Defaults `en`
   * @example modules.word.preposition() // Schema
   * @example modules.word.preposition().getValue() // 'at'
   * @returns string
   */
  preposition(args?: WordProps) {
    return new Module<string, WordProps>(
      (a) => this.utils.oneOfArray(this.filterWords(a.language).prepositions),
      args || {},
    );
  }

  /**
   * Returns a adverb from a selected lenguage
   * @param args.language word language (`en` | `es`). Defaults `en`
   * @example modules.word.adverb() // Schema
   * @example modules.word.adverb().getValue() // 'here'
   * @returns string
   */
  adverb(args?: WordProps) {
    return new Module<string, WordProps>(
      (a) => this.utils.oneOfArray(this.filterWords(a.language).adverbs),
      args || {},
    );
  }

  /**
   * Returns a verb from a selected lenguage
   * @param args.language word language (`en` | `es`). Defaults `en`
   * @example modules.word.verb() // Schema
   * @example modules.word.verb().getValue() // 'had'
   * @returns string
   */
  verb(args?: WordProps) {
    return new Module<string, WordProps>(
      (a) => this.utils.oneOfArray(this.filterWords(a.language).verbs),
      args || {},
    );
  }

  /**
   * Returns a noun from a selected lenguage
   * @param args.language word language (`en` | `es`). Defaults `en`
   * @example modules.word.noun() // Schema
   * @example modules.word.noun().getValue() // 'car'
   * @returns string
   */
  noun(args?: WordProps) {
    return new Module<string, WordProps>(
      (a) => this.utils.oneOfArray(this.filterWords(a.language).nouns),
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
