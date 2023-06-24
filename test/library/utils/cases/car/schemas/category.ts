import { chaca } from "../../../../../../src";

export const CATEGORY_SCHEMA = chaca.schema({
  id: chaca.key(chaca.sequence()),
  name: chaca.sequential(["B", "C", "D", "E"]),
});
