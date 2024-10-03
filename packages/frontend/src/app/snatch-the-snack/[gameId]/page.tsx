import { InitializeTileMap } from "@/components/inGame/InitializeTileMap";
import { ServiceCallers } from "@/services/serviceCallers";
import { GameId, GameType, isServiceError, PlayerId } from "@resync-games/api";
import { redirect } from "next/navigation";

export default async function TileGame({
  params
}: {
  params: { gameId: GameId };
}) {
  const gameStateAndInfo = await ServiceCallers.gameState.getGameState({
    gameId: params.gameId,
    gameType: "snatch-the-snack" as GameType,
    playerId: "player-1" as PlayerId
  });
  if (isServiceError(gameStateAndInfo)) {
    redirect("/");
  }

  return <InitializeTileMap gameStateAndInfo={gameStateAndInfo} />;
}
