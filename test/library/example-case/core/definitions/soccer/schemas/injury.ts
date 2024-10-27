import { chaca, modules } from "../../../../../../../src";

export const INJURY_SCHEMA = chaca.schema({
  id: chaca.key(chaca.sequence()),
  player_id: chaca.ref("Player.id"),
  start_date: () => modules.date.past(),
  end_date: ({ currentFields }) =>
    modules.date.future({ refDate: currentFields.start_date }),
  severity: chaca.enum(["normal", "high", "low"]),
  treatment_cost: () => modules.datatype.float({ min: 50000, max: 200000 }),
});
