import { chaca } from "../../../../../src";
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

export const BASEBALL_CASE_DATA = chaca.multiGenerate([
  { name: "Phase", schema: PHASE_SCHEMA, documents: 10 },
  { name: "Stadium", documents: 10, schema: STADIUM_SCHEMA },
  { name: "Team", documents: 10, schema: TEAM_SCHEMA },
  { name: "TeamMember", documents: 10, schema: TEAM_MEMBER_SCHEMA },
  { name: "Player", documents: 10, schema: PLAYER_SCHEMA },
  { name: "Coach", documents: 10, schema: COACH_SCHEMA },
  { name: "Pitcher", documents: 10, schema: PITCHER_SCHEMA },
  { name: "Batter", documents: 10, schema: BATTER_SCHEMA },
  { name: "Game", documents: 10, schema: GAME_SCHEMA },
]);
