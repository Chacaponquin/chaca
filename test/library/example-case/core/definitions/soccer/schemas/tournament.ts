import { chaca, modules } from "../../../../../../../src";

export const TOURNAMENT_SCHEMA = chaca.schema({
  id: chaca.key(chaca.sequence()),
  name: () => modules.lorem.words(),
  country: () => modules.address.country(),
  prize_money: () => modules.datatype.float({ min: 50000, max: 20000000 }),
  start_date: () => modules.date.past(),
  end_date: ({ currentFields }) => {
    return modules.date.between({
      to: new Date(),
      from: currentFields.start_date,
    });
  },
  /* winner_id: chaca.ref('Team.id', {where: ({store, refFields, currentFields}) => {
    const allMatchs = store.get('Match').filter(m => m.tournament_id === currentFields.id)


  }})*/
});
