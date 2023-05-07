import { chaca, schemas } from "../../../../../../src";
import { PHASE_NAMES } from "../constants";

export const PHASE_SCHEMA = chaca.defineSchema({
  phase_id: chaca.key(schemas.id.uuid()),
  phase_name: chaca.sequential(PHASE_NAMES),
  start_date: schemas.date.past(),
  finish_date: (fields) => {
    return schemas.date
      .between()
      .getValue({ from: fields.start_date, to: new Date() });
  },
  count_teams: chaca.sequential([16, 8, 4, 2]),
});
