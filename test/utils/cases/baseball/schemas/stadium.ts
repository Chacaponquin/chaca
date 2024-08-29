import { chaca, modules } from "../../../../../src";

const stadiumNameSchema = chaca.module<unknown, string>(() => {
  return [
    modules.person.firstName().getValue(),
    modules.person.lastName().getValue(),
    "Stadium",
  ].join(" ");
});

export const STADIUM_SCHEMA = chaca.schema({
  stadium_id: chaca.key(chaca.sequence()),
  stadium_name: stadiumNameSchema(),
  capacity: modules.datatype.int({ min: 17000, max: 20000 }),
});
