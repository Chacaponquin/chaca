import { chaca, schemas } from "../../../../src";

export const simpleSchema = new chaca.Schema({
  id: schemas.id.mongodbID(),
  image: schemas.image.film(),
  name: schemas.person.firstName({ language: "es" }),
});

export const SIMPLE_OBJECT = simpleSchema.generateObject();
export const SIMPLE_OBJECT_DOCS = simpleSchema.generate(50);
