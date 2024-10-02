import { InitializeTileMap } from "@/components/inGame/InitializeTileMap";
import { ServiceCallers } from "@/services/serviceCallers";
import { isServiceError, TileGameId } from "@resync-games/api";
import { redirect } from "next/navigation";

export default async function TileGame({
  params
}: {
  params: { tileGameId: TileGameId };
}) {
  const maybeTileGame = await ServiceCallers.tileGame.getTileGame({
    gameId: params.tileGameId
  });
  if (isServiceError(maybeTileGame)) {
    redirect("/");
  }

  return (
    <InitializeTileMap
      game={maybeTileGame.game}
      tileMap={maybeTileGame.tileMap}
    />
  );
}
