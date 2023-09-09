import { chaca, schemas } from "../../../src";

export const NESTED_OBJECT_SCHEMA = chaca.schema({
  id: chaca.key(schemas.id.mongodbID()),
  image: schemas.image.film(),
  name: schemas.person.firstName({ language: "es" }),
  currentMovie: chaca.schema({
    name: schemas.person.firstName(),
    image: { type: schemas.image.event(), possibleNull: 60 },
  }),
});
