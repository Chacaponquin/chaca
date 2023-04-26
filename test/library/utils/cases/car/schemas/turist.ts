import { chaca, schemas } from "../../../../../../src";

export const TURIST_SCHEMA = chaca.defineSchema({
  passport: chaca.key(schemas.id.mongodbID()),
  name: schemas.person.fullName(),
  age: schemas.dataType.int({ min: 15, max: 80 }),
  sex: { enum: ["Male", "Woman"] },
  country: chaca.ref("Country.id"),
  contact: schemas.phone.number(),
});
