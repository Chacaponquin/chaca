import { SPANISH_NAMES } from './spanish';
import { ENGLISH_NAMES } from './english';

export interface ILanguageNames {
  male: string[];
  female: string[];
  lastNames: string[];
}

export default { es: SPANISH_NAMES, en: ENGLISH_NAMES };
