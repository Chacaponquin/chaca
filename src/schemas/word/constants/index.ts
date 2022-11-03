import { ENGLISH_WORDS } from "./english";
import { SPANISH_WORDS } from "./spanish";

export interface ILanguageWord {
  verbs: string[];
  conjuctions: string[];
  interjections: string[];
  prepositions: string[];
  adverbs: string[];
  adjectives: string[];
  nouns: string[];
}

const e: { [path: string]: ILanguageWord } = {
  es: SPANISH_WORDS,
  en: ENGLISH_WORDS,
};

export default e;
