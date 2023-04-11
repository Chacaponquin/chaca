import { chaca, schemas } from "../../../../src";

export const SCHEMA = new chaca.Schema({
  id: { type: schemas.id.mongodbID() },
  image: schemas.image.film(),
  name: schemas.person.firstName({ language: "es" }),
  currentMovie: new chaca.Schema({
    name: schemas.person.firstName(),
    image: { type: schemas.image.event(), posibleNull: 60 },
  }),
});

export const NESTED_OBJECTS_DOCS = SCHEMA.generate(50);
