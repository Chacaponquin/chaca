import { chaca, schemas } from "../../../src";

export const SIMPLE_SCHEMA = chaca.schema({
  id: chaca.key(schemas.id.mongodbID()),
  image: schemas.image.film(),
  name: schemas.person.firstName({ language: "es" }),
});
