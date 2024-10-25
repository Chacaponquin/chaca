import { chaca, modules } from "../../../../../src";

export const CART = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  created_at: () => modules.date.past(),
  updated_at: ({ currentFields }) => {
    return modules.date.future({ refDate: currentFields.created_at });
  },
  status: chaca.enum(["active", "ordered", "abandonned"]),
  created_by: chaca.ref("User.id", {
    where: ({ refFields }) => {
      return refFields.role === "customer";
    },
  }),
});
