import { InitializeTileMap } from "@/components/inGame/InitializeTileMap";
import { ServiceCallers } from "@/services/serviceCallers";
import { isServiceError, TileMapId } from "@resync-games/api";
import { redirect } from "next/navigation";

export default async function Page({
  params
}: {
  params: { tileMapId: TileMapId };
}) {
  const { tileMapId } = params;

  const maybeLoadedTileMap = await ServiceCallers.snatchTheSnackMaps.getTileMap(
    {
      tileMapId: tileMapId
    }
  );
  if (isServiceError(maybeLoadedTileMap)) {
    redirect("/");
  }

  return <InitializeTileMap tileMap={maybeLoadedTileMap.tileMap} />;
}
