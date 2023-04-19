import { chaca, schemas } from "../../../src";

export const SCHEMA_WITH_ARRAY_FIELDS = new chaca.Schema({
  id: { type: schemas.id.mongodbID(), isArray: 20 },
  image: { type: schemas.image.film() },
  name: { type: schemas.person.firstName({ language: "es" }) },
});

export const SCHEMA_WITH_ARRAY_DOCS = SCHEMA_WITH_ARRAY_FIELDS.generate(50);
export const SCHEMA_WITH_ARRAY_OBJECT =
  SCHEMA_WITH_ARRAY_FIELDS.generateObject();
