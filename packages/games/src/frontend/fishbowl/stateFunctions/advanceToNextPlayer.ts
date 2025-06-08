import { cloneDeep } from "lodash-es";
import { PlayerId, PlayerInGame } from "../../../../imports/api";
import {
  FishbowlActivePlayer,
  FishbowlActiveTracker,
  FishbowlGameConfiguration,
  FishbowlRound
} from "../../../backend";

export function getNextPlayer(
  turnOrder: PlayerId[],
  activeRound: FishbowlRound,
  allPlayers: PlayerInGame[]
) {
  const currentPlayerIndex = turnOrder.findIndex(
    (order) => order === activeRound.currentActivePlayer.player.playerId
  );

  const nextPlayerIndex = (currentPlayerIndex + 1) % turnOrder.length;
  const nextPlayer = allPlayers.find(
    (player) => player.playerId === turnOrder[nextPlayerIndex]
  );

  return nextPlayer;
}

export function advanceToNextPlayer(
  activeRound: FishbowlRound,
  turnOrder: PlayerId[],
  allPlayers: PlayerInGame[],
  gameConfiguration: FishbowlGameConfiguration
) {
  const newFishbowlRound: FishbowlRound = cloneDeep(activeRound);
  newFishbowlRound.lastUpdatedAt = new Date().toISOString();

  const nextPlayer = getNextPlayer(turnOrder, activeRound, allPlayers);
  if (nextPlayer === undefined) {
    // Something went wrong here, we should error out
    throw new Error(
      "Next player not found. Something went terribly wrong. Please refresh the page and try again."
    );
  }

  const fishbowlActiveTracker: FishbowlActiveTracker = {
    countdownTimer: (gameConfiguration.timePerPlayer[1] ?? 0) * 1000,
    lastUpdatedAt: new Date().toISOString(),
    seedTime: 0,
    startTime: 0,
    state: "paused"
  };

  const nextActivePlayer: FishbowlActivePlayer = {
    lastUpdatedAt: new Date().toISOString(),
    player: nextPlayer,
    timer: fishbowlActiveTracker
  };
  newFishbowlRound.currentActivePlayer = nextActivePlayer;

  return newFishbowlRound;
}
