import { chaca, schemas } from "../../../../../src";
import { PLAYER_POSITIONS } from "../constants";

export const POSITION_SCHEMA = chaca.schema({
  position_id: chaca.key(chaca.sequence()),
  position_name: chaca.sequential(PLAYER_POSITIONS),
});
