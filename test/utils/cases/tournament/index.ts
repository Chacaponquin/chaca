import { DatasetSchema } from "../../../../src";
import { TOURNAMENTE_SCHEMA } from "./schemas";

export const TOURNAMENT_SCHEMAS: DatasetSchema[] = [
  { name: "Tournament", documents: 10, schema: TOURNAMENTE_SCHEMA },
];
