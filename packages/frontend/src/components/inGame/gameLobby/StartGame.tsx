import { useContext, useState } from "react";
import { isServiceError } from "../../../imports/api";
import { useGameStateSelector } from "../../../redux";
import { ClientServiceCallers } from "../../../services/serviceCallers";
import { PlayerContext } from "../../player/PlayerContext";
import { canStartGame } from "../utils/canStartGame";
import { Button } from "../../../lib/radix";

export const StartGame = () => {
  const { gameInfo } = useGameStateSelector((s) => s.gameStateSlice);
  const { player } = useContext(PlayerContext);

  const [isLoading, setIsLoading] = useState(false);

  const onStartGame = async () => {
    if (gameInfo === undefined) {
      return;
    }

    setIsLoading(true);
    const response = await ClientServiceCallers.gameState.changeGameState({
      currentGameState: "playing",
      gameId: gameInfo.gameId,
      gameType: gameInfo.gameType,
      playerId: player.playerId
    });

    if (!isServiceError(response)) {
      return;
    }

    setIsLoading(false);
    console.error(response);
  };

  const maybeCheckCanStartGame = () => {
    if (gameInfo === undefined) {
      return false;
    }

    return canStartGame(gameInfo);
  };

  return (
    <Button
      disabled={!maybeCheckCanStartGame()}
      loading={isLoading}
      onClick={onStartGame}
      style={{ height: "100%" }}
    >
      Start!
    </Button>
  );
};
