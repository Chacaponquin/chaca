import { chaca, modules } from "../../../src";

export const SIMPLE_SCHEMA = chaca.schema({
  id: chaca.key(modules.id.uuid()),
  image: modules.image.film(),
  name: modules.person.firstName({ language: "es" }),
});
