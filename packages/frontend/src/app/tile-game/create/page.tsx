import { CreateNewGame } from "@/components/CreateNewGame";
import { ServiceCallers } from "@/services/serviceCallers";
import { isServiceError } from "@tiles-tbd/api";

export default async function CreateTileGame() {
  const availableTileMaps = await ServiceCallers.tileMap.getAllTileMaps({});
  if (isServiceError(availableTileMaps)) {
    return <div>Error loading maps</div>;
  }

  return <CreateNewGame tileMaps={availableTileMaps.tileMaps} />;
}
