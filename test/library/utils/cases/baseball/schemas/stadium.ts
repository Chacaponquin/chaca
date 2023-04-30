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
  stadium_id: chaca.key(schemas.id.uuid()),
  name: stadiumNameSchema(),
  capacity: schemas.dataType.int({ min: 5000, max: 20000 }),
});
