"use client";

import { Button } from "@/lib/radix/Button";
import { Flex } from "@/lib/radix/Flex";
import { ClientServiceCallers } from "@/services/serviceCallers";
import { Text } from "@radix-ui/themes";
import { GameType, isServiceError, PlayerId } from "@resync-games/api";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import styles from "./createGame.module.scss";

export default function CreateGame() {
  const router = useRouter();

  const onCreateGame = async (gameSlug: GameType) => {
    const newGame = await ClientServiceCallers.gameState.createGame({
      gameConfiguration: {},
      gameName: `Example game ${new Date().toDateString()}-${new Date().toTimeString()}`,
      gameType: gameSlug,
      playerId: "player-1" as PlayerId,
      version: "1.0.0."
    });

    if (isServiceError(newGame)) {
      console.error(newGame);
      return;
    }

    router.push(`/${gameSlug}/${newGame.gameId}`);
  };

  // Lazy load the game component only on the client-side
  const DynamicComponent = dynamic(
    () =>
      import("@resync-games/games").then((module) => {
        const { GAME_REGISTRY } = module;
        return () => (
          <Flex direction="column" gap="2">
            {Object.entries(GAME_REGISTRY).map(([slug, { name }]) => (
              <Button
                key={slug}
                onClick={() => onCreateGame(slug as GameType)}
                style={{ padding: "5px" }}
              >
                {name}
              </Button>
            ))}
          </Flex>
        );
      }),
    { ssr: false } // Disable server-side rendering
  );

  return (
    <Flex className={styles.formBoxContainer} direction="column" gap="2">
      <Flex className={styles.formBox} direction="column" gap="5">
        <Text>Pick game to create</Text>
        <DynamicComponent />
      </Flex>
    </Flex>
  );
}
