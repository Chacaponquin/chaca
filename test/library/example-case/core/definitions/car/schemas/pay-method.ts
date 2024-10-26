import { chaca } from "../../../../../../../src";

export const PAY_METHOD_SCHEMA = chaca.schema({
  id: chaca.key(chaca.sequence()),
  name: chaca.sequential(["Crédito", "Efectivo"]),
});
