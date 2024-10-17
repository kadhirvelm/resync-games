import { ClientServiceCallers } from "@/services/serviceCallers";
import { Player } from "@resync-games/api";
import { GameStateReduxSlice } from "../stores/redux/gameStateSlice";

export function emitGameStateUpdate(
  currentGameState: GameStateReduxSlice<object, object>,
  newState: Partial<object>,
  player: Player
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
    playerId: player.playerId
  });
}
