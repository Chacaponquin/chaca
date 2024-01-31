import { chaca, schemas } from "../../../../../src";

const placa = chaca.schemaField(() => {
  return chaca.utils.replaceSymbols("T######");
});

export const CAR_SCHEMA = chaca.schema({
  plate: chaca.key(placa()),
  model_id: chaca.ref("Model.id"),
  color: schemas.color.rgb(),
  km: schemas.dataType.int({ min: 0, max: 15000 }),
  situation: schemas.dataType.int({ min: 0, max: 3 }),
});
