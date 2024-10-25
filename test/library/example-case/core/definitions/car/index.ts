import { chaca } from "../../../../../../src";
import { BRAND_SCHEMA } from "./schemas/brand";
import { CAR_SCHEMA } from "./schemas/car";
import { CONTRACT_SCHEMA } from "./schemas/contract";
import { DRIVER_SCHEMA } from "./schemas/driver";
import { MODEL_SCHEMA } from "./schemas/model";
import { PAY_METHOD_SCHEMA } from "./schemas/pay-method";
import { TURIST_SCHEMA } from "./schemas/turist";

const DOCS = 10;

export const CAR_DATASET = chaca.dataset([
  { documents: 2, name: "Pay_Method", schema: PAY_METHOD_SCHEMA },
  { documents: 5, name: "Brand", schema: BRAND_SCHEMA },
  { documents: 5, name: "Model", schema: MODEL_SCHEMA },
  { documents: DOCS, name: "Car", schema: CAR_SCHEMA },
  { documents: DOCS, name: "Driver", schema: DRIVER_SCHEMA },
  { documents: DOCS, name: "Tourist", schema: TURIST_SCHEMA },
  { documents: DOCS, name: "Contract", schema: CONTRACT_SCHEMA },
]);
