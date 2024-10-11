import { chaca, modules } from "../../../src";

export const NESTED_OBJECT_SCHEMA = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  image: () => modules.image.film(),
  name: () => modules.person.firstName({ language: "es" }),
  currentMovie: chaca.schema({
    name: () => modules.person.firstName(),
    image: { type: () => modules.image.event(), possibleNull: 0.6 },
  }),
});
