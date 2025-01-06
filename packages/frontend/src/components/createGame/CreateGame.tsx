"use client";

import { TextField } from "@/lib/radix";
import { Flex } from "@/lib/radix/Flex";
import { getFrontendGame } from "@/lib/utils/getFrontendGame";
import { ClientServiceCallers } from "@/services/serviceCallers";
import { Button, Text } from "@radix-ui/themes";
import { isServiceError } from "@resync-games/api";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { PlayerContext } from "../player/PlayerContext";
import SelectGame, { SelectedGame } from "./components/SelectGame";
import styles from "./CreateGame.module.scss";
import { getDefaultConfiguration } from "./utils/getDefaultConfiguration";

export default function CreateGame() {
  const player = useContext(PlayerContext);
  const router = useRouter();

  const [gameName, setGameName] = useState<string>("");
  const [selectedGame, onSelectGame] = useState<SelectedGame | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const onCreateGame = async () => {
    if (selectedGame === undefined) {
      return;
    }

    const { gameType: gameSlug, version } = selectedGame;
    const accordingGame = getFrontendGame(gameSlug);

    setIsLoading(true);
    const newGame = await ClientServiceCallers.gameState.createGame({
      gameConfiguration: getDefaultConfiguration(
        accordingGame.gameConfiguration
      ),
      gameName: gameName,
      gameType: gameSlug,
      playerId: player.playerId,
      version
    });

    if (isServiceError(newGame)) {
      console.error(newGame);
      setIsLoading(false);
      return;
    }

    router.push(`/${gameSlug}/${newGame.gameId}`);
  };

  return (
    <Flex className={styles.formBoxContainer} direction="column">
      <Flex className={styles.formBox} direction="column" gap="3">
        <Text>Hi, {player.displayName}! Pick game to create</Text>
        <Flex direction="column" gap="2">
          <Flex>
            <Text color="gray" size="2">
              Game type
            </Text>
          </Flex>
          <SelectGame onSelectGame={onSelectGame} selectedGame={selectedGame} />
        </Flex>
        <Flex direction="column" gap="2" my="2">
          <Flex>
            <Text color="gray" size="2">
              Game name
            </Text>
          </Flex>
          <TextField
            onChange={setGameName}
            placeholder="Set the name of your game here..."
            value={gameName}
          />
        </Flex>
        <Flex justify="end">
          <Button
            disabled={gameName === "" || selectedGame === undefined}
            loading={isLoading}
            onClick={onCreateGame}
          >
            Create game
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
