import { chaca, modules } from "../../../../../../../src";

export const TEAM_SPONSOR = chaca.schema({
  sponsor_id: chaca.ref("Sponsor.id"),
  team_id: chaca.ref("Team.id"),
  bonuses: () => modules.datatype.float({ min: 10000, max: 500000 }),
  contact_email: () => modules.internet.email(),
  contract_start_date: () => modules.date.past(),
  contract_end_date: () => modules.date.future({ refDate: new Date() }),
});
