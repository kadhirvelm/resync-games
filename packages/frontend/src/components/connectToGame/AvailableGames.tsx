import { Flex } from "@/lib/radix/Flex";
import { ServiceCallers } from "@/services/serviceCallers";
import { Code, Text } from "@radix-ui/themes";
import { isServiceError } from "@resync-games/api";
import { AvailableGame } from "./availableGame/AvailableGame";
import { NavigateToCreate } from "./availableGame/NavigateToCreate";
import styles from "./AvailableGames.module.scss";

export default async function AvailableGames() {
  const maybeAvailableGames = await ServiceCallers.gameState.getAvailableGames(
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
        {maybeAvailableGames.games.map((availableGame) => (
          <AvailableGame game={availableGame} key={availableGame.gameId} />
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
