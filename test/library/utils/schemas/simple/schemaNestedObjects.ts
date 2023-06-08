import { chaca, schemas } from "../../../../../src";

export const NESTED_OBJECT_SCHEMA = chaca.defineSchema({
  id: schemas.id.mongodbID(),
  image: schemas.image.film(),
  name: schemas.person.firstName({ language: "es" }),
  currentMovie: chaca.defineSchema({
    name: schemas.person.firstName(),
    image: { type: schemas.image.event(), posibleNull: 60 },
  }),
});
