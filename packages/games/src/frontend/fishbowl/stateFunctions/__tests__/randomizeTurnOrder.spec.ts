import { PlayerId, PlayerInGame } from "../../../../../imports/api";
import { randomizeTurnOrder } from "../randomizeTurnOrder";

function createPlayers(team: number, count: number) {
  return Array.from({ length: count }, (_, index) => ({
    avatarCollection: "thumbs",
    displayName: `${team}-${index + 1}`,
    playerId: `${team}-${index + 1}` as PlayerId,
    team
  }));
}

describe("randomizeTurnOrder", () => {
  it("should randomize the turn order for even number of players", () => {
    const players: PlayerInGame[] = [
      ...createPlayers(1, 10),
      ...createPlayers(2, 10)
    ];

    const randomTurnOrder = randomizeTurnOrder(players);
    expect(randomTurnOrder).toHaveLength(players.length);
    expect(randomTurnOrder).not.toEqual(players.map((p) => p.playerId));

    for (const index of Array.from(
      { length: randomTurnOrder.length - 1 },
      (_, index) => index
    )) {
      const playerId = randomTurnOrder[index];
      const player = players.find((p) => p.playerId === playerId);
      if (player === undefined) {
        throw new Error("Player not found");
      }

      const nextPlayerId = randomTurnOrder[index + 1];
      const nextPlayer = players.find((p) => p.playerId === nextPlayerId);
      if (nextPlayer === undefined) {
        throw new Error("Next player not found");
      }

      expect(player.team).not.toBe(nextPlayer.team);
    }
  });

  it("should randomize the turn order for an odd number of players with more players on team 1", () => {
    const players: PlayerInGame[] = [
      ...createPlayers(1, 10),
      ...createPlayers(2, 9)
    ];

    const randomTurnOrder = randomizeTurnOrder(players);
    expect(randomTurnOrder).toHaveLength(players.length + 1);
    expect(randomTurnOrder).not.toEqual(players.map((p) => p.playerId));

    for (const index of Array.from(
      { length: randomTurnOrder.length - 1 },
      (_, index) => index
    )) {
      const playerId = randomTurnOrder[index];
      const player = players.find((p) => p.playerId === playerId);
      if (player === undefined) {
        throw new Error("Player not found");
      }

      const nextPlayerId = randomTurnOrder[index + 1];
      const nextPlayer = players.find((p) => p.playerId === nextPlayerId);
      if (nextPlayer === undefined) {
        throw new Error("Next player not found");
      }

      expect(player.team).not.toBe(nextPlayer.team);
    }
  });

  it("should randomize the turn order for an odd number of players with more players on team 2", () => {
    const players: PlayerInGame[] = [
      ...createPlayers(1, 9),
      ...createPlayers(2, 10)
    ];

    const randomTurnOrder = randomizeTurnOrder(players);
    expect(randomTurnOrder).toHaveLength(players.length + 1);
    expect(randomTurnOrder).not.toEqual(players.map((p) => p.playerId));

    for (const index of Array.from(
      { length: randomTurnOrder.length - 1 },
      (_, index) => index
    )) {
      const playerId = randomTurnOrder[index];
      const player = players.find((p) => p.playerId === playerId);
      if (player === undefined) {
        throw new Error("Player not found");
      }

      const nextPlayerId = randomTurnOrder[index + 1];
      const nextPlayer = players.find((p) => p.playerId === nextPlayerId);
      if (nextPlayer === undefined) {
        throw new Error("Next player not found");
      }

      expect(player.team).not.toBe(nextPlayer.team);
    }
  });
});
