import { chaca, modules } from "../../../../../../../src";

const stadiumNameSchema = () => {
  return [
    modules.person.firstName(),
    modules.person.lastName(),
    "Stadium",
  ].join(" ");
};

export const STADIUM_SCHEMA = chaca.schema({
  stadium_id: chaca.key(chaca.sequence()),
  stadium_name: stadiumNameSchema,
  capacity: () => modules.datatype.int({ min: 17000, max: 20000 }),
});
