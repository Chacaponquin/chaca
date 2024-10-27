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
  team_id: chaca.ref("Team.id", {
    nullOnEmpty: true,
    where: ({ store, refFields }) => {
      const players = store
        .currentDocuments()
        .filter((p) => p.team_id === refFields.id);

      if (players.length < 26) {
        return true;
      }

      return true;
    },
  }),
  height: () => modules.datatype.float({ precision: 2, min: 1.4, max: 2.0 }),
});
