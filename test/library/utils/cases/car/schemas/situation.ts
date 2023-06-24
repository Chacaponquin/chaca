import { chaca } from "../../../../../../src";

export const SITUATION_SCHEMA = chaca.schema({
  id: chaca.key(chaca.sequence()),
  name: chaca.sequential(["Disponible", "En taller", "Alquilado"]),
});
