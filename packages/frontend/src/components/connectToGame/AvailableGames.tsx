import { Flex } from "@/lib/radix/Flex";
import { ServiceCallers } from "@/services/serviceCallers";
import { Code, Text } from "@radix-ui/themes";
import { isServiceError, TileMap, TileMapId } from "@resync-games/api";
import { keyBy } from "lodash-es";
import { AvailableGame } from "./availableGame/AvailableGame";
import { NavigateToCreate } from "./availableGame/NavigateToCreate";
import styles from "./AvailableGames.module.scss";

export default async function AvailableGames() {
  const maybeAvailableGames = await ServiceCallers.tileGame.getAvailableGames(
    {}
  );
  if (isServiceError(maybeAvailableGames)) {
    return (
      <Flex className={styles.availableGames} direction="column" gap="2">
        <Text>There was an issue loading games.</Text>
        <Code>{maybeAvailableGames.message}</Code>
      </Flex>
    );
  }

  const mapsIndexed: { [key: TileMapId]: TileMap } = keyBy(
    maybeAvailableGames.tileMaps,
    "tileMapId"
  );

  return (
    <Flex className={styles.availableGames} direction="column" gap="4" m="2">
      <Text color="gray" size="2">
        Available games
      </Text>
      <Flex
        className={styles.gamesContainer}
        direction="column"
        flex="1"
        gap="2"
      >
        {maybeAvailableGames.tileGames.map((tileGame) => (
          <AvailableGame
            game={tileGame}
            indexedMaps={mapsIndexed}
            key={tileGame.tileGameId}
          />
        ))}
      </Flex>
      <Flex justify="end">
        <Flex>
          <NavigateToCreate />
        </Flex>
      </Flex>
    </Flex>
  );
}
