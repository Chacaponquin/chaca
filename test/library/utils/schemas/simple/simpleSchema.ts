import { chaca, schemas } from "../../../../../src";

export const SIMPLE_SCHEMA = new chaca.Schema({
  id: schemas.id.mongodbID(),
  image: schemas.image.film(),
  name: schemas.person.firstName({ language: "es" }),
});
