import { SPANISH_NAMES } from "./spanish.js";
import { ENGLISH_NAMES } from "./english.js";
import { GENDERS as G } from "./genders.js";
import { JOBS_AREAS, JOB_LEVELS } from "./jobs.js";
import { LANGUAGES } from "./language.js";

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
export { LANGUAGES };
