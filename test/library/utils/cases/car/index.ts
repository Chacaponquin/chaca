import { chaca } from "../../../../../src";
import { BRAND_SCHEMA } from "./schemas/brand";
import { CAR_SCHEMA } from "./schemas/car";
import { CATEGORY_SCHEMA } from "./schemas/category";
import { CONTRACT_SCHEMA } from "./schemas/contract";
import { COUNTRY_SCHEMA } from "./schemas/country";
import { DRIVER_SCHEMA } from "./schemas/driver";
import { MODEL_SCHEMA } from "./schemas/model";
import { TURIST_SCHEMA } from "./schemas/turist";

const DOCS = 500;
export const CAR_CASE_DATA = chaca.multiGenerate([
  { documents: DOCS, name: "Brand", schema: BRAND_SCHEMA },
  { documents: DOCS, name: "Car", schema: CAR_SCHEMA },
  { documents: DOCS, name: "Category", schema: CATEGORY_SCHEMA },
  { documents: DOCS, name: "Contract", schema: CONTRACT_SCHEMA },
  { documents: DOCS, name: "Country", schema: COUNTRY_SCHEMA },
  { documents: DOCS, name: "Driver", schema: DRIVER_SCHEMA },
  { documents: DOCS, name: "Model", schema: MODEL_SCHEMA },
  { documents: DOCS, name: "Turist", schema: TURIST_SCHEMA },
]);