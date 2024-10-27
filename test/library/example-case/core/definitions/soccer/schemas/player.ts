import { chaca, modules } from "../../../../../../../src";

export const PLAYER_SCHEMA = chaca.schema({
  id: chaca.key(chaca.sequence()),
  name: () => modules.person.fullName({ sex: "male" }),
  position: chaca.enum([
    "POR",
    "LI",
    "LD",
    "DFC",
    "MC",
    "MCD",
    "MCO",
    "ED",
    "EI",
    "SD",
    "DC",
  ]),
  birth_date: () => modules.date.birthdate(),
  team_id: chaca.ref("Team.id"),
  height: () => modules.datatype.float({ precision: 2, min: 1.4, max: 2.0 }),
});
