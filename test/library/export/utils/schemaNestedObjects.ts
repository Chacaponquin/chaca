import { chaca, schemas } from "../../../../src";

export const SCHEMA = new chaca.Schema({
  id: { type: schemas.id.mongodbID(), isArray: 10 },
  image: schemas.image.film(),
  name: schemas.person.firstName({ language: "es" }),
  currentMovie: new chaca.Schema({
    name: schemas.person.firstName(),
    image: schemas.image.event(),
  }),
});

export const NESTED_OBJECTS_DOCS = SCHEMA.generate(50);
