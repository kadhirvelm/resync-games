import { TileMap } from "@/components/TileMap";
import { ServiceCallers } from "@/services/serviceCallers";
import { isServiceError, TileMapId } from "@tiles-tbd/api";
import { redirect } from "next/navigation";

export default async function Page({
  params
}: {
  params: { tileMapId: TileMapId };
}) {
  const { tileMapId } = params;

  const maybeLoadedTileMap = await ServiceCallers.tileMap.getTileMap({
    tileMapId: tileMapId
  });
  if (isServiceError(maybeLoadedTileMap)) {
    redirect("/");
  }

  return <TileMap tileMap={maybeLoadedTileMap.tileMap} />;
}
