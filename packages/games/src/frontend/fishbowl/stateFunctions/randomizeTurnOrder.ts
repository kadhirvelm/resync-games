import { shuffle, groupBy, range } from "lodash-es";
import { PlayerInGame, PlayerId } from "../../../../imports/api";

// We need to alternate between teams picking players to keep it fair
export function randomizeTurnOrder(allPlayers: PlayerInGame[]) {
  const randomizedPlayerOrder = shuffle(allPlayers);
  const playersByTeam = groupBy(randomizedPlayerOrder, "team");

  const teamIds = shuffle(Object.keys(playersByTeam));

  const randomizedTurnOrder: PlayerId[] = [];

  const totalPlayers =
    allPlayers.length % 2 === 0 ? allPlayers.length : allPlayers.length + 1;
  for (const index of range(totalPlayers)) {
    // Alternate between teams picking players to go
    const teamId = teamIds[index % teamIds.length];
    if (teamId === undefined) {
      throw new Error("No team id found. Something went terribly wrong.");
    }

    // If there are an odd number of players, we need to shuffle the players with less back into the pool
    let randomPlayer = playersByTeam[teamId]?.pop();
    if (randomPlayer === undefined) {
      playersByTeam[teamId] = shuffle(
        allPlayers.filter((p) => p.team === parseInt(teamId))
      );
      randomPlayer = playersByTeam[teamId].pop();
    }

    if (randomPlayer === undefined) {
      throw new Error("No player found. Something went terribly wrong.");
    }

    randomizedTurnOrder.push(randomPlayer.playerId);
  }

  return randomizedTurnOrder;
}
