import { chaca, modules } from "../../../../../src";

export const SOCIAL_PROFILE = chaca.schema({
  user_id: chaca.key(
    chaca.ref("User.id", {
      where: ({ refFields }) => {
        return refFields.role === "customer";
      },
    }),
  ),
  plataform_user: () => modules.internet.username(),
  plataform: chaca.enum([
    "facebook",
    "twitter",
    "instagram",
    "slack",
    "github",
  ]),
  created_at: () => modules.date.past(),
});
