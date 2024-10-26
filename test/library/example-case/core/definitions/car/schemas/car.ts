import { chaca, modules } from "../../../../../../../src";

const placa = () => {
  return chaca.utils.replaceSymbols("T######");
};

export const CAR_SCHEMA = chaca.schema({
  plate: chaca.key(placa),
  model_id: chaca.ref("Model.id"),
  color: () => modules.color.rgb(),
  km: () => modules.datatype.int({ min: 0, max: 15000 }),
  situation: () => modules.datatype.int({ min: 0, max: 3 }),
});
