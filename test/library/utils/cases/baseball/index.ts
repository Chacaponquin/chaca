import { chaca } from "../../../../../src";
import { PHASE_NAMES, PROVINCES } from "./constants";
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

export const BASEBALL_SCHEMAS = [
  { name: "Phase", schema: PHASE_SCHEMA, documents: PHASE_NAMES.length },
  { name: "Stadium", documents: 400, schema: STADIUM_SCHEMA },
  { name: "Team", documents: PROVINCES.length, schema: TEAM_SCHEMA },
  { name: "TeamMember", documents: CANT_DOC, schema: TEAM_MEMBER_SCHEMA },
  { name: "Player", documents: 500, schema: PLAYER_SCHEMA },
  { name: "Coach", documents: 33, schema: COACH_SCHEMA },
  { name: "Pitcher", documents: 110, schema: PITCHER_SCHEMA },
  { name: "Batter", documents: 500, schema: BATTER_SCHEMA },
  { name: "Game", documents: 500, schema: GAME_SCHEMA },
];

export const BASEBALL_CASE_DATA = chaca.multiGenerate(BASEBALL_SCHEMAS);
