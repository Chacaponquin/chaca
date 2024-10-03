import { chaca, modules } from "../../../../../src";

interface Result {
  player1: string;
  player2: string;
  win: string;
}

interface Participant {
  name: string;
  type: string;
}

function filter(all: Participant[], banned: Participant[]): Participant[] {
  return all.filter((p) => !banned.includes(p));
}

function createResults(quarter: Participant[]): Result[] {
  const results = [] as Result[];

  for (const player of quarter) {
    const found = results.some(
      (r) => r.player1 === player.name || r.player2 === player.name,
    );

    if (!found) {
      const rest = quarter.filter((p) => p !== player);

      const choice = chaca.utils.oneOfArray(
        rest.filter(
          (p) =>
            !results.some((r) => r.player1 === p.name || r.player2 === p.name),
        ),
      );

      results.push({
        player1: choice.name,
        player2: player.name,
        win: chaca.utils.oneOfArray([choice.name, player.name]),
      });
    }
  }

  return results;
}

export const TOURNAMENTE_SCHEMA = chaca.schema({
  id: () => modules.id.uuid(),
  name: () => modules.lorem.words(),
  participants: {
    type: chaca.schema({
      name: () => modules.internet.username(),
      type: chaca.enum(["Minmax", "Random"]),
    }),
    isArray: 8,
  },
  status: chaca.enum(["Finalizado", "Pendiente"]),
  type: chaca.enum(["Knockout", "FreeForAll"]),
  results: ({ currentFields }) => {
    let allResults = [] as Result[];

    if (currentFields.status === "Finalizado") {
      if (currentFields.type === "FreeForAll") {
        for (const player of currentFields.participants) {
          const results = [] as Result[];

          const restPlayers = currentFields.participants.filter(
            (p: Participant) => p.name !== player.name,
          );

          for (const rest of restPlayers) {
            const exist = results.some(
              (r) =>
                (r.player1 === rest.name && r.player2 === player.name) ||
                (r.player2 === rest.name && r.player1 === player.name),
            );

            if (!exist) {
              allResults.push({
                player1: player.name,
                player2: rest.name,
                win: chaca.utils.oneOfArray([player.name, rest.name]),
              });
            }
          }

          allResults.concat(results);
        }
      }

      // knockout
      else if (currentFields.type === "Knockout") {
        let semis = [] as Participant[];
        const quarter = currentFields.participants as Participant[];
        let final = [] as Participant[];

        final = [...quarter.slice(0, 2)];
        semis = [...final, ...filter(quarter, final).slice(0, 2)];

        const quarterResults = createResults(quarter);
        const semisResult = createResults(semis);
        const finalResult = createResults(final);

        console.log({ semis, final, quarter });

        allResults = [...quarterResults, ...semisResult, ...finalResult];
      }

      return allResults;
    }
  },
});
