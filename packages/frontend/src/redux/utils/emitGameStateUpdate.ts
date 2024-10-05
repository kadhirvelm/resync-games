import { ClientServiceCallers } from "@/services/serviceCallers";
import { GameStateReduxSlice } from "../stores/redux/gameStateSlice";
import { PlayerId } from "@resync-games/api";

export function emitGameStateUpdate(
  currentGameState: GameStateReduxSlice<object, object>,
  newState: Partial<object>
) {
  const { gameInfo, gameState } = currentGameState;
  if (gameInfo === undefined || gameState === undefined) {
    throw new Error(
      `Attempted to emit a game state update with empty gameInfo and gameState: ${{ gameInfo, gameState }}`
    );
  }

  ClientServiceCallers.gameState.updateGame({
    ...gameInfo,
    newGameState: {
      ...gameState,
      ...newState
    },
    playerId: "player-1" as PlayerId
  });
}
