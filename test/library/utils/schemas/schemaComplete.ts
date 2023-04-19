import { chaca, schemas } from "../../../../src";

export const COMPLETE_SCHEMA = chaca.defineSchema({
  id: schemas.id.uuid(),
  authors: {
    type: schemas.person.fullName({ language: "es" }),
    isArray: 5,
  },
  image: schemas.image.film(),
  likes: schemas.dataType.int({ min: 0, max: 500000 }),
  category: {
    enum: [
      "Horror",
      "War",
      "History",
      "Comedy",
      "Mystery",
      "Action",
      "Animation",
      "Musical",
    ],
  },
  adultMovie: (docFields) => {
    if (
      docFields.category === "Horror" ||
      docFields.category === "War" ||
      docFields.category === "Action"
    ) {
      return true;
    } else return false;
  },
  directorsInf: {
    type: new chaca.Schema({
      name: schemas.person.fullName({}),
      age: schemas.dataType.int({ min: 18, max: 85 }),
      currentMovie: {
        type: new chaca.Schema({
          movieName: schemas.person.firstName(),
          image: schemas.image.event(),
        }),
        posibleNull: 50,
      },
      email: schemas.internet.email(),
    }),
    isArray: { min: 1, max: 4 },
  },
});
