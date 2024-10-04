"use client";

import { Flex } from "@/lib/radix/Flex";
import { NavigationButton } from "@/lib/resync-components/NavigationButton";
import { Text } from "@radix-ui/themes";
import styles from "./AvailableGame.module.scss";
import { GameState } from "./GameState";
import { AvailableGame as AvailableGameType } from "@resync-games/api";

export const AvailableGame = ({ game }: { game: AvailableGameType }) => {
  return (
    <Flex className={styles.singleGame} direction="column" p="3">
      <Flex align="center" flex="1" justify="between">
        <Flex>
          <Text>{game.gameId}</Text>
        </Flex>
        <GameState state={"waiting"} />
      </Flex>
      <Flex>
        <Text color="gray" size="2">
          Game - {game.gameType}
        </Text>
      </Flex>
      <Flex justify="end" mt="4">
        <Flex>
          <NavigationButton
            href={`/snatch-the-snack/${game.gameId}`}
            variant="outline"
          >
            Join game
          </NavigationButton>
        </Flex>
      </Flex>
    </Flex>
  );
};
