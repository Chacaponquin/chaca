import { chaca, modules } from "../../../../../src";

export const SCHEMA_ONE = chaca.schema({
  id: modules.id.uuid,
  ref: chaca.ref("SchemaTwo.ref"),
});

export const SCHEMA_TWO = chaca.schema({
  id: modules.id.uuid,
  ref: chaca.ref("SchemaThree.ref"),
});

export const SCHEMA_THREE = chaca.schema({
  id: modules.id.uuid,
  name: () => modules.person.fullName(),
});

export const REPEAT_NAMES_DATA = () =>
  chaca
    .dataset([
      { name: "SchemaOne", documents: 50, schema: SCHEMA_ONE },
      { name: "SchemaOne", documents: 50, schema: SCHEMA_TWO },
      { name: "SchemaThree", documents: 50, schema: SCHEMA_THREE },
    ])
    .generate();
