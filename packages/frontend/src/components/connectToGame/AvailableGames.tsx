import { useNetworkCall } from "@/lib/hooks/useNetworkCall";
import { Flex } from "@/lib/radix/Flex";
import { ClientServiceCallers } from "@/services/serviceCallers";
import { Text } from "@radix-ui/themes";
import { AvailableGame } from "./availableGame/AvailableGame";
import { NavigateToCreate } from "./availableGame/NavigateToCreate";
import styles from "./AvailableGames.module.scss";

export function AvailableGames() {
  const { result: availableGames } = useNetworkCall(() =>
    ClientServiceCallers.gameState.getAvailableGames({})
  );

  if (availableGames == null) {
    return;
  }

  const maybeRenderGames = () => {
    if (availableGames.games.length === 0) {
      return (
        <Text color="gray" size="2">
          No games available - try creating one below!
        </Text>
      );
    }

    return availableGames.games.map((availableGame) => (
      <AvailableGame game={availableGame} key={availableGame.gameId} />
    ));
  };

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
        {maybeRenderGames()}
      </Flex>
      <Flex justify="end">
        <Flex>
          <NavigateToCreate />
        </Flex>
      </Flex>
    </Flex>
  );
}
