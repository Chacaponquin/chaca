import { chaca, schemas } from "../../../../../../src";
import { PROVINCES } from "../constants";

export const PROVINCE_SCHEMA = chaca.defineSchema({
  province_id: chaca.key(schemas.id.uuid()),
  province_name: chaca.sequential(PROVINCES),
});
