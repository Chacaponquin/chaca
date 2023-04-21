import { chaca } from "../../../../../src";
import { PHASE_NAMES } from "./constants";
import { GAME_SCHEMA } from "./schemas/game";
import { PHASE_SCHEMA } from "./schemas/phase";
import { STADIUM_SCHEMA } from "./schemas/stadium";
import { TEAM_SCHEMA } from "./schemas/team";
import {
  BATTER_SCHEMA,
  COACH_SCHEMA,
  PITCHER_SCHEMA,
  PLAYER_SCHEMA,
  TEAM_MEMBER_SCHEMA,
} from "./schemas/teamMember";

const CANT_DOC = 500;

export const BASEBALL_CASE_DATA = chaca.multiGenerate([
  { name: "Game", documents: CANT_DOC, schema: GAME_SCHEMA },
  { name: "Phase", schema: PHASE_SCHEMA, documents: PHASE_NAMES.length },
  { name: "Stadium", documents: CANT_DOC, schema: STADIUM_SCHEMA },
  { name: "Team", documents: CANT_DOC, schema: TEAM_SCHEMA },
  { name: "TeamMember", documents: CANT_DOC, schema: TEAM_MEMBER_SCHEMA },
  { name: "Player", documents: CANT_DOC, schema: PLAYER_SCHEMA },
  { name: "Coach", documents: CANT_DOC, schema: COACH_SCHEMA },
  { name: "Pitcher", documents: CANT_DOC, schema: PITCHER_SCHEMA },
  { name: "Batter", documents: CANT_DOC, schema: BATTER_SCHEMA },
]);
