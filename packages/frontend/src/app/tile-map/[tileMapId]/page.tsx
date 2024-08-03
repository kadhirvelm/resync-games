import { ServiceCallers } from "@/services/serviceCallers";
import { isServiceError, TileMapId } from "@tiles-tbd/api";
import { Box } from "grommet";
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

  return <Box>{JSON.stringify(maybeLoadedTileMap.tileMap)}</Box>;
}
