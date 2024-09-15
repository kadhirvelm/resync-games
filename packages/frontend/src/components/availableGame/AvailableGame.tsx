"use client";

import { Button } from "@/lib/radix/Button";
import { Flex } from "@/lib/radix/Flex";
import { Text } from "@radix-ui/themes";
import { TileGame, TileMap, TileMapId } from "@tiles-tbd/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./AvailableGame.module.scss";
import { GameState } from "./GameState";

export const AvailableGame = ({
  game,
  indexedMaps
}: {
  game: TileGame;
  indexedMaps: { [key: TileMapId]: TileMap };
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onJoin = () => {
    setIsLoading(true);
    router.push(`/tile-game/${game.tileGameId}`);
  };

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
          Map: {accordingMap?.tileMapId}
        </Text>
      </Flex>
      <Flex justify="end" mt="4">
        <Flex>
          <Button
            disabled={game.state !== "waiting"}
            loading={isLoading}
            onClick={onJoin}
            variant="outline"
          >
            Join game
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
