import { chaca, schemas } from "../../../../src";

export const SCHEMA = new chaca.Schema({
  id: { type: schemas.id.mongodbID(), isArray: 20 },
  image: { type: schemas.image.film() },
  name: { type: schemas.person.firstName({ language: "es" }) },
});

export const SCHEMA_WITH_ARRAY_DOCS = SCHEMA.generate(50);
export const SCHEMA_WITH_ARRAY_OBJECT = SCHEMA.generateObject();
