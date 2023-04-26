import { chaca, schemas } from "../../../../../../src";

export const CAR_SCHEMA = chaca.defineSchema({
  plate: chaca.key(schemas.id.mongodbID()),
  model_id: chaca.ref("Model.id"),
  color: schemas.word.preposition(),
  cant_km: schemas.dataType.int({ min: 0, max: 15000 }),
  situation: { enum: ["AVAILABLE", "WORKSHOP", "RENTED"] },
});
