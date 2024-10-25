import { chaca, modules } from "../../../../../src";

export const ORDER = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  user_id: chaca.ref("User.id", {
    where: ({ refFields }) => {
      return refFields.role === "customer";
    },
  }),
  created_at: () => modules.date.past(),
});
