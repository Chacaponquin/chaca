import { chaca, schemas } from "../../../src";

export const SIMPLE_SCHEMA = new chaca.Schema({
  id: schemas.id.mongodbID(),
  image: schemas.image.film(),
  name: schemas.person.firstName({ language: "es" }),
});

export const SIMPLE_OBJECT = SIMPLE_SCHEMA.generateObject();
export const SIMPLE_OBJECT_DOCS = SIMPLE_SCHEMA.generate(50);
