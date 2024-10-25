import { chaca, modules } from "../../../../../src";

export const SOCIAL_PROFILE = chaca.schema({
  user_id: chaca.key(() => modules.id.uuid()),
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
