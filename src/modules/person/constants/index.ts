import { SPANISH_NAMES } from "./spanish";
import { ENGLISH_NAMES } from "./english";
import { GENDERS as G } from "./genders";
import { JOBS_AREAS, JOB_LEVELS } from "./jobs";
import { LANGUAGES } from "./language";
import { PREFIXES } from "./prefix";

export interface ILanguageNames {
  male: string[];
  female: string[];
  lastNames: string[];
}

export const NAMES = { es: SPANISH_NAMES, en: ENGLISH_NAMES };
export const GENDERS = G;
export const JOBS = {
  JOBS_AREAS,
  JOB_LEVELS,
};
export { LANGUAGES, PREFIXES };
