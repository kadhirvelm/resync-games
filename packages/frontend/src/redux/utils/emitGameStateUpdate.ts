import { ClientServiceCallers } from "@/services/serviceCallers";
import { Player } from "@/imports/api";
import { GameStateReduxSlice } from "../stores/redux/gameStateSlice";

export function emitGameStateUpdate(
  currentGameState: GameStateReduxSlice<object>,
  newState: Partial<object>,
  player: Player
) {
  const { gameInfo } = currentGameState;
  if (gameInfo === undefined) {
    throw new Error(
      `Attempted to emit a game state update with empty gameInfo and gameState: ${{ gameInfo }}`
    );
  }

  ClientServiceCallers.gameState.updateGame({
    ...gameInfo,
    lastUpdatedAt: new Date().toISOString(),
    // The backend will fetch the current state and append that in here so we can minimize the amount of state being transferred over the network
    newGameState: newState,
    playerId: player.playerId
  });
}
