import { ENGLISH_WORDS } from "./english.js";
import { SPANISH_WORDS } from "./spanish.js";

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
