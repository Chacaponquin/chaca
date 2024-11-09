import { chaca, modules } from "../../../../../../../src";

export const TRANSFER_SCHEMA = chaca.schema({
  id: chaca.key(chaca.sequence()),
  player_id: chaca.ref("Player.id"),
  date: () => modules.date.past(),
  origin_team_id: chaca.ref("Team.id"),
  destination_team_id: chaca.ref("Team.id", {
    where: ({ currentFields, refFields }) => {
      return currentFields.origin_team_id !== refFields.id;
    },
  }),
  agent_name: () => modules.person.fullName(),
  amount: () => modules.datatype.float({ min: 5000, max: 200000000 }),
  agent_fee: ({ currentFields }) => {
    return currentFields.amount / modules.datatype.int({ min: 5, max: 20 });
  },
});
