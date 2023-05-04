import { chaca } from "../../../../../src";
import { PHASE_NAMES, PLAYER_POSITIONS, PROVINCES } from "./constants";
import { GAME_SCHEMA } from "./schemas/game";
import { PHASE_SCHEMA } from "./schemas/phase";
import { POSITION_SCHEMA } from "./schemas/position";
import { PROVINCE_SCHEMA } from "./schemas/province";
import { STADIUM_SCHEMA } from "./schemas/stadium";
import { TEAM_SCHEMA } from "./schemas/team";
import {
  BATTER_SCHEMA,
  COACH_SCHEMA,
  PITCHER_SCHEMA,
  PLAYER_SCHEMA,
  TEAM_MEMBER_SCHEMA,
} from "./schemas/teamMember";

const CANT_DOC = 1000;

export const BASEBALL_SCHEMAS = [
  {
    name: "Position",
    schema: POSITION_SCHEMA,
    documents: PLAYER_POSITIONS.length,
  },
  { name: "Province", schema: PROVINCE_SCHEMA, documents: PROVINCES.length },
  { name: "Phase", schema: PHASE_SCHEMA, documents: PHASE_NAMES.length },
  { name: "Stadium", documents: 400, schema: STADIUM_SCHEMA },
  { name: "Team", documents: PROVINCES.length, schema: TEAM_SCHEMA },
  { name: "TeamMember", documents: CANT_DOC, schema: TEAM_MEMBER_SCHEMA },
  { name: "Player", documents: CANT_DOC, schema: PLAYER_SCHEMA },
  { name: "Coach", documents: CANT_DOC, schema: COACH_SCHEMA },
  { name: "Pitcher", documents: 150, schema: PITCHER_SCHEMA },
  { name: "Batter", documents: 150, schema: BATTER_SCHEMA },
  { name: "Game", documents: 500, schema: GAME_SCHEMA },
];

export const BASEBALL_CASE_DATA = chaca.multiGenerate(BASEBALL_SCHEMAS);
