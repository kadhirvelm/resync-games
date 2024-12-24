"use client";

import { PlayerContext } from "@/components/player/PlayerContext";
import { Flex } from "@/lib/radix/Flex";
import { NavigationButton } from "@/lib/resync-components/NavigationButton";
import { Text } from "@radix-ui/themes";
import {
  AvailableGame as AvailableGameType,
  isServiceError
} from "@resync-games/api";
import { useContext } from "react";
import styles from "./AvailableGame.module.scss";
import { GameState } from "./GameState";
import { ClientServiceCallers } from "@/services/serviceCallers";
import {
  GAME_REGISTRY,
  GAME_SLUGS
} from "@resync-games/games-shared/gamesRegistry";

export const AvailableGame = ({ game }: { game: AvailableGameType }) => {
  const player = useContext(PlayerContext);

  const onJoinGame = async () => {
    const result = await ClientServiceCallers.gameState.joinGame({
      gameId: game.gameId,
      gameType: game.gameType,
      playerId: player.playerId
    });

    if (!isServiceError(result)) {
      return;
    }

    throw new Error(result.message);
  };

  const gameSlug = game.gameType as (typeof GAME_SLUGS)[number];

  return (
    <Flex className={styles.singleGame} direction="column" p="3">
      <Flex align="center" flex="1" justify="between">
        <Flex>
          <Text>{game.gameName}</Text>
        </Flex>
        <GameState state={"waiting"} />
      </Flex>
      <Flex>
        <Text color="gray" size="2">
          {GAME_REGISTRY[gameSlug]?.name}
        </Text>
      </Flex>
      <Flex justify="end" mt="4">
        <Flex>
          <NavigationButton
            href={`/${game.gameType}/${game.gameId}`}
            onNavigation={onJoinGame}
            variant="outline"
          >
            Join game
          </NavigationButton>
        </Flex>
      </Flex>
    </Flex>
  );
};
