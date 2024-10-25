import { chaca } from "../../../../../src";
import { PROVINCES } from "../constants";

export const PROVINCE_SCHEMA = chaca.schema({
  province_id: chaca.key(chaca.sequence()),
  province_name: chaca.sequential(PROVINCES),
});
