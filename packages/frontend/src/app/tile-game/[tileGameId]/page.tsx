import { TileMap } from "@/components/TileMap";
import { ServiceCallers } from "@/services/serviceCallers";
import { isServiceError, TileGameId } from "@tiles-tbd/api";
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
    <TileMap pawns={maybeTileGame.game.pawns} tileMap={maybeTileGame.tileMap} />
  );
}
