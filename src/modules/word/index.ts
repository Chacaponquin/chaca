import { ChacaUtils } from "../../core/utils";
import { ILanguageWord, WORDS } from "./constants";

export type Languages = "es" | "en";

export type WordProps = {
  language?: Languages;
};

export class WordModule {
  readonly constants = { words: WORDS };

  /**
   * Returns a adjective from a selected lenguage
   * @param args.language word language (`en` | `es`). Defaults `en`
   * @example modules.word.adjective() // 'clever'
   * @returns string
   */
  adjective(args?: WordProps): string {
    const utils = new ChacaUtils();
    return utils.oneOfArray(this.filterWords(args?.language).adjectives);
  }

  /**
   * Returns a conjuction from a selected lenguage
   * @param args.language word language (`en` | `es`). Defaults `en`
   * @example modules.word.conjuction() // 'but'
   * @returns string
   */
  conjuction(args?: WordProps): string {
    const utils = new ChacaUtils();
    return utils.oneOfArray(this.filterWords(args?.language).conjuctions);
  }

  /**
   * Returns a interjection from a selected lenguage
   * @param args.language word language (`en` | `es`). Defaults `en`
   * @example modules.word.interjection() // 'hey!'
   * @returns string
   */
  interjection(args?: WordProps): string {
    const utils = new ChacaUtils();
    return utils.oneOfArray(this.filterWords(args?.language).interjections);
  }

  /**
   * Returns a preposition from a selected lenguage
   * @param args.language word language (`en` | `es`). Defaults `en`
   * @example modules.word.preposition() // 'at'
   * @returns string
   */
  preposition(args?: WordProps): string {
    const utils = new ChacaUtils();
    return utils.oneOfArray(this.filterWords(args?.language).prepositions);
  }

  /**
   * Returns a adverb from a selected lenguage
   * @param args.language word language (`en` | `es`). Defaults `en`
   * @example modules.word.adverb() // 'here'
   * @returns string
   */
  adverb(args?: WordProps): string {
    const utils = new ChacaUtils();
    return utils.oneOfArray(this.filterWords(args?.language).adverbs);
  }

  /**
   * Returns a verb from a selected lenguage
   * @param args.language word language (`en` | `es`). Defaults `en`
   * @example modules.word.verb() // 'had'
   * @returns string
   */
  verb(args?: WordProps): string {
    const utils = new ChacaUtils();
    return utils.oneOfArray(this.filterWords(args?.language).verbs);
  }

  /**
   * Returns a noun from a selected lenguage
   * @param args.language word language (`en` | `es`). Defaults `en`
   * @example modules.word.noun() // 'car'
   * @returns string
   */
  noun(args?: WordProps): string {
    const utils = new ChacaUtils();
    return utils.oneOfArray(this.filterWords(args?.language).nouns);
  }

  private filterWords(lan: Languages | undefined): ILanguageWord {
    if (typeof lan === "string") {
      const languageSelected = WORDS[lan];

      if (languageSelected) {
        return languageSelected;
      }
    }

    return WORDS["en"];
  }
}
