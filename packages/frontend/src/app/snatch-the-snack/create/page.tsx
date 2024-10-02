import { CreateNewGame } from "@/components/createGame/CreateNewGame";
import { ServiceCallers } from "@/services/serviceCallers";
import { isServiceError } from "@resync-games/api";

export default async function CreateTileGame() {
  const availableTileMaps =
    await ServiceCallers.snatchTheSnackMaps.getAllTileMaps({});
  if (isServiceError(availableTileMaps)) {
    return <div>Failed to load tile maps</div>;
  }

  return <CreateNewGame tileMaps={availableTileMaps.tileMaps} />;
}
