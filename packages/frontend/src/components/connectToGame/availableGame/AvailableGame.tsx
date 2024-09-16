"use client";

import { Flex } from "@/lib/radix/Flex";
import { NavigationButton } from "@/lib/tiles-components/NavigationButton";
import { Text } from "@radix-ui/themes";
import { TileGame, TileMap, TileMapId } from "@tiles-tbd/api";
import styles from "./AvailableGame.module.scss";
import { GameState } from "./GameState";

export const AvailableGame = ({
  game,
  indexedMaps
}: {
  game: TileGame;
  indexedMaps: { [key: TileMapId]: TileMap };
}) => {
  const accordingMap = indexedMaps[game.tileMapId];

  return (
    <Flex className={styles.singleGame} direction="column" p="3">
      <Flex align="center" flex="1" justify="between">
        <Flex>
          <Text>{game.name}</Text>
        </Flex>
        <GameState state={game.state} />
      </Flex>
      <Flex>
        <Text color="gray" size="2">
          Game - {game.tileGameId}
        </Text>
      </Flex>
      <Flex>
        <Text color="gray" size="2">
          Map - {accordingMap?.tileMapId}
        </Text>
      </Flex>
      <Flex justify="end" mt="4">
        <Flex>
          <NavigationButton
            disabled={game.state !== "waiting"}
            href={`/tile-game/${game.tileGameId}`}
            variant="outline"
          >
            Join game
          </NavigationButton>
        </Flex>
      </Flex>
    </Flex>
  );
};
