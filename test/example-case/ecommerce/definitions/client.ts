import { chaca, modules } from "../../../../src";

export const CLIENT_SCHEMA = chaca.schema({
  id: chaca.key(
    chaca.ref("User.id", {
      unique: true,
      where: ({ refFields }) => {
        return refFields.role === "client";
      },
    }),
  ),
  enterprice: { type: () => modules.word.noun(), possibleNull: 0.6 },
  country: () => modules.address.country(),
  zipCode: () => modules.address.zipCode(),
  level: chaca.probability([
    { value: "normal", chance: 0.8 },
    { value: "premium", chance: 0.3 },
    { value: "vip", chance: 0.1 },
  ]),
});
