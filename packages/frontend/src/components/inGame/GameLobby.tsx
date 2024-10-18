import { Flex } from "@/lib/radix/Flex";
import { useGameStateSelector } from "@/redux";
import { GoHome } from "./components/GoHome";
import { Button } from "@/lib/radix/Button";
import { ClientServiceCallers } from "@/services/serviceCallers";
import { useContext, useState } from "react";
import { PlayerContext } from "../player/PlayerContext";
import { isServiceError } from "@resync-games/api";
import styles from "./GameLobby.module.scss";
import { Text } from "@radix-ui/themes";

export const GameLobby = () => {
  const { gameInfo } = useGameStateSelector((s) => s.gameStateSlice);
  const player = useContext(PlayerContext);

  const [isLoading, setIsLoading] = useState(false);

  const onStartGame = async () => {
    if (gameInfo === undefined) {
      return;
    }

    setIsLoading(true);
    const response = await ClientServiceCallers.gameState.changeGameState({
      currentGameState: "playing",
      gameId: gameInfo.gameId,
      gameType: gameInfo.gameType,
      playerId: player.playerId
    });

    if (!isServiceError(response)) {
      return;
    }

    setIsLoading(false);
    console.error(response);
  };

  return (
    <Flex direction="column" flex="1">
      <Flex>
        <GoHome />
      </Flex>
      <Flex className={styles.players} direction="column" gap="2">
        {gameInfo?.players.map((p) => (
          <Flex justify="center" key={p.playerId}>
            <Text>{p.displayName}</Text>
          </Flex>
        ))}
        <Flex mt="5">
          <Button loading={isLoading} onClick={onStartGame}>
            Start game
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
