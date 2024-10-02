import { ServiceCallers } from "@/services/serviceCallers";
import { Button, Flex, Text } from "@radix-ui/themes";
import { isServiceError } from "@resync-games/api";
import Link from "next/link";

export default async function AvailableMaps() {
  const maybeAvailableTileMaps =
    await ServiceCallers.snatchTheSnackMaps.getAllTileMaps({});
  if (isServiceError(maybeAvailableTileMaps)) {
    return <div>Error loading tile maps!</div>;
  }

  return (
    <Flex direction="column" gap="2" m="10px">
      <Text>Available maps</Text>
      {maybeAvailableTileMaps.tileMaps.map((tileMap) => (
        <Link href={`tile-map/${tileMap.tileMapId}`}>
          <Button key={tileMap.tileMapId}>{tileMap.tileMapId}</Button>
        </Link>
      ))}
    </Flex>
  );
}
