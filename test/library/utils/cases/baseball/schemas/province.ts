import { chaca, schemas } from "../../../../../../src";
import { PROVINCES } from "../constants";

export const PROVINCE_SCHEMA = chaca.defineSchema({
  province_id: chaca.key(chaca.sequence()),
  province_name: chaca.sequential(PROVINCES),
});
