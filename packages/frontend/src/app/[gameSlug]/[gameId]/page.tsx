import { InitializeGame } from "@/components/inGame/InitializeGame";
import { ServiceCallers } from "@/services/serviceCallers";
import { GameId, GameType, isServiceError, PlayerId } from "@resync-games/api";
import { redirect } from "next/navigation";

export default async function Page({
  params: { gameSlug, gameId }
}: {
  params: { gameId: GameId; gameSlug: GameType };
}) {
  const gameStateAndInfo = await ServiceCallers.gameState.getGameState({
    gameId: gameId,
    gameType: gameSlug,
    playerId: "player-1" as PlayerId
  });
  if (isServiceError(gameStateAndInfo)) {
    redirect("/");
  }

  return (
    <InitializeGame gameSlug={gameSlug} gameStateAndInfo={gameStateAndInfo} />
  );
}
