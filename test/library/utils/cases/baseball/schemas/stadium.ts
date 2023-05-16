import { chaca, schemas } from "../../../../../../src";

const stadiumNameSchema = chaca.defineSchemaField<unknown, string>(
  "stadiumName",
  () => {
    return [
      schemas.person.firstName().getValue(),
      schemas.person.lastName().getValue(),
      "Stadium",
    ].join(" ");
  },
);

export const STADIUM_SCHEMA = chaca.defineSchema({
  stadium_id: chaca.key(chaca.sequence()),
  stadium_name: stadiumNameSchema(),
  capacity: schemas.dataType.int({ min: 17000, max: 20000 }),
});
