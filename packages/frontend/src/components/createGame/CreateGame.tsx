"use client";

import { isServiceError } from "@/imports/api";
import { Button } from "@/lib/radix";
import { Flex } from "@/lib/radix/Flex";
import { NavigationButton } from "@/lib/resync-components/NavigationButton";
import { getFrontendGame } from "@/lib/utils/getFrontendGame";
import { ClientServiceCallers } from "@/services/serviceCallers";
import { ExitIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { PlayerContext } from "../player/PlayerContext";
import SelectGame, { SelectedGame } from "./components/SelectGame";
import styles from "./CreateGame.module.scss";
import { getDefaultConfiguration } from "./utils/getDefaultConfiguration";
import { SettingsIcon } from "lucide-react";
import { OpenSnapshotState } from "./components/OpenSnapshotState";

export default function CreateGame() {
  const { player } = useContext(PlayerContext);
  const router = useRouter();

  const [selectedGame, onSelectGame] = useState<SelectedGame | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [openSnapshot, setOpenSnapshot] = useState(false);

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
    <Flex className={styles.formBoxContainer} direction="column" p="2">
      <Flex className={styles.goHome}>
        <NavigationButton href="/" variant="outline">
          <ExitIcon />
        </NavigationButton>
      </Flex>
      <Flex className={styles.formBox} direction="column" gap="3">
        <Flex direction="column" gap="2">
          {openSnapshot ? (
            <OpenSnapshotState />
          ) : (
            <SelectGame
              onSelectGame={onSelectGame}
              selectedGame={selectedGame}
            />
          )}
        </Flex>
        <Flex align="center" justify="end" mt="2">
          {process.env.NEXT_PUBLIC_DEVELOPMENT_MODE === "true" && (
            <Flex flex="1" mr="2">
              <SettingsIcon
                className={styles.snapshot}
                color={openSnapshot ? "blue" : undefined}
                onClick={() => setOpenSnapshot(!openSnapshot)}
                size={16}
              />
            </Flex>
          )}
          <Flex>
            <Button
              disabled={selectedGame === undefined}
              loading={isLoading}
              onClick={onCreateGame}
              style={{ width: "300px" }}
            >
              Create game
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
