import { ClientServiceCallers } from "@/services/serviceCallers";
import {
  GameId,
  GameStateAndInfo,
  GameType,
  isServiceError
} from "@resync-games/api";
import { redirect } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../player/PlayerContext";
import { InitializeGame } from "./InitializeGame";
import { Flex } from "@/lib/radix/Flex";

export const GetGameState = ({
  gameId,
  gameSlug
}: {
  gameId: GameId;
  gameSlug: GameType;
}) => {
  const player = useContext(PlayerContext);

  const [gameStateAndInfo, setGameStateAndInfo] =
    useState<GameStateAndInfo | null>(null);

  const fetchGameState = async () => {
    const gameStateAndInfo = await ClientServiceCallers.gameState.getGameState({
      gameId: gameId,
      gameType: gameSlug,
      playerId: player.playerId
    });
    if (isServiceError(gameStateAndInfo)) {
      redirect("/");
    }

    setGameStateAndInfo(gameStateAndInfo);
  };

  useEffect(() => {
    fetchGameState();
  }, []);

  if (gameStateAndInfo == null) {
    return <Flex>Loading game...</Flex>;
  }

  return (
    <InitializeGame gameSlug={gameSlug} gameStateAndInfo={gameStateAndInfo} />
  );
};
