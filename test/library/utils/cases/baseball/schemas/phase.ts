import { chaca, schemas } from "../../../../../../src";
import { PHASE_NAMES } from "../constants";

export const PHASE_SCHEMA = chaca.defineSchema({
  phase_id: chaca.key(schemas.id.uuid()),
  name: chaca.sequential(PHASE_NAMES),
  start_date: schemas.date.past(),
  finish_date: schemas.date.past(),
});
