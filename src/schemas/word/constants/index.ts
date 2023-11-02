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

export default {
  es: SPANISH_WORDS,
  en: ENGLISH_WORDS,
};
