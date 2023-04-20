import { chaca, schemas } from "../../../../../src";

export const NESTED_OBJECT_SCHEMA = new chaca.Schema({
  id: schemas.id.mongodbID(),
  image: schemas.image.film(),
  name: schemas.person.firstName({ language: "es" }),
  currentMovie: new chaca.Schema({
    name: schemas.person.firstName(),
    image: { type: schemas.image.event(), posibleNull: 60 },
  }),
});
