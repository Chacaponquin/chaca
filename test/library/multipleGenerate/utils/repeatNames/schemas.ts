import { chaca, schemas } from "../../../../../src";

export const SCHEMA_ONE = chaca.defineSchema({
  id: schemas.id.uuid(),
  ref: chaca.ref("SchemaTwo.ref"),
});

export const SCHEMA_TWO = chaca.defineSchema({
  id: schemas.id.uuid(),
  ref: chaca.ref("SchemaThree.ref"),
});

export const SCHEMA_THREE = chaca.defineSchema({
  id: schemas.id.uuid(),
  name: schemas.person.fullName(),
});

export const REPEAT_NAMES_DATA = () =>
  chaca.multiGenerate([
    { name: "SchemaOne", documents: 50, schema: SCHEMA_ONE },
    { name: "SchemaOne", documents: 50, schema: SCHEMA_TWO },
    { name: "SchemaThree", documents: 50, schema: SCHEMA_THREE },
  ]);
