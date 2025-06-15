import { cloneDeep } from "lodash-es";
import { PlayerId, PlayerInGame } from "../../../../imports/api";
import {
  FishbowlActivePlayer,
  FishbowlActiveTracker,
  FishbowlGame,
  FishbowlGameConfiguration,
  FishbowlRound,
  FishbowlSinglePlayerContributions,
  FishbowlWord
} from "../../../backend";
import { randomizeTurnOrder } from "./randomizeTurnOrder";
import { paused } from "./timerControl";

function getActivePlayer(
  gameState: FishbowlGame,
  allPlayers: PlayerInGame[],
  gameConfiguration: FishbowlGameConfiguration
) {
  const maybeActivePlayer = gameState.round?.currentActivePlayer;
  if (maybeActivePlayer !== undefined) {
    const activePlayer = cloneDeep(maybeActivePlayer);
    activePlayer.timer = paused(activePlayer.timer);

    return activePlayer;
  }

  const activePlayer = allPlayers.find(
    (p) => p.playerId === gameState.turnOrder[0]
  );
  if (activePlayer === undefined) {
    throw new Error("No active player found. Something went terribly wrong.");
  }

  const fishbowlActiveTracker: FishbowlActiveTracker = {
    countdownTimer: (gameConfiguration.timePerPlayer[1] ?? 0) * 1000,
    lastUpdatedAt: new Date().toISOString(),
    seedTime: 0,
    startTime: 0,
    state: "paused"
  };

  const firstPlayer: FishbowlActivePlayer = {
    lastUpdatedAt: new Date().toISOString(),
    player: activePlayer,
    timer: fishbowlActiveTracker
  };

  return firstPlayer;
}

export function newRound(
  gameState: FishbowlGame,
  allPlayers: PlayerInGame[],
  gameConfiguration: FishbowlGameConfiguration
) {
  const gameWords: FishbowlWord[] = Object.values(
    gameState.playerWordContributions
  ).reduce(
    (acc: FishbowlWord[], current: FishbowlSinglePlayerContributions) =>
      acc.concat(current.words),
    []
  );

  const remainingWords = gameWords.slice();
  const currentActiveWord = remainingWords.pop();
  if (currentActiveWord === undefined) {
    throw new Error("No words found in game state");
  }

  const nextFishbowlRound: FishbowlRound = {
    correctGuesses: [],
    currentActiveDrawing: undefined,
    currentActivePlayer: getActivePlayer(
      gameState,
      allPlayers,
      gameConfiguration
    ),
    currentActiveWord,
    lastUpdatedAt: new Date().toISOString(),
    remainingWords,
    roundNumber: (gameState.round?.roundNumber ?? 0) + 1
  };

  const randomTurnOrder: PlayerId[] = randomizeTurnOrder(allPlayers);

  return { gameWords, round: nextFishbowlRound, turnOrder: randomTurnOrder };
}
