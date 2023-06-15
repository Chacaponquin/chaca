import { chaca } from "../../../../../../src";

export const CATEGORY_SCHEMA = chaca.defineSchema({
  id: chaca.key(chaca.sequence()),
  name: chaca.enum(["B", "C", "D", "E"]),
});
