import { CreateNewGame } from "@/components/createGame/CreateNewGame";
import { ServiceCallers } from "@/services/serviceCallers";
import { isServiceError } from "@tiles-tbd/api";

export default async function CreateTileGame() {
  const availableTileMaps = await ServiceCallers.tileMap.getAllTileMaps({});
  if (isServiceError(availableTileMaps)) {
    return <div>Failed to load tile maps</div>;
  }

  return <CreateNewGame tileMaps={availableTileMaps.tileMaps} />;
}
