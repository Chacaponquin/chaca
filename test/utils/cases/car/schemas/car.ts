import { chaca, schemas } from "../../../../../src";

const placa = chaca.schemaField(() => {
  return chaca.utils.replaceSymbols("T######");
});

export const CAR_SCHEMA = chaca.schema({
  plate: chaca.key(placa()),
  model_id: chaca.ref("Model.id"),
  color: chaca.enum(["rojo", "negro", "blanco", "amarillo"]),
  cant_km: schemas.dataType.int({ min: 0, max: 15000 }),
  situation: chaca.ref("Situation.id"),
  brand_id: chaca.ref("Brand.id"),
});
