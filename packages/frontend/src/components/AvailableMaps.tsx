import { ServiceCallers } from "@/services/serviceCallers";
import { isServiceError } from "@tiles-tbd/api";
import { Box, Button, Text } from "grommet";
import Link from "next/link";

export default async function AvailableMaps() {
  const maybeAvailableTileMaps = await ServiceCallers.tileMap.getAllTileMaps(
    {}
  );
  if (isServiceError(maybeAvailableTileMaps)) {
    return <div>Error loading tile maps!</div>;
  }

  return (
    <Box gap="2" margin="10px">
      <Text>Available maps</Text>
      {maybeAvailableTileMaps.tileMaps.map((tileMap) => (
        <Link href={`tile-map/${tileMap.tileMapId}`}>
          <Button label={tileMap.tileMapId} key={tileMap.tileMapId} />
        </Link>
      ))}
    </Box>
  );
}
