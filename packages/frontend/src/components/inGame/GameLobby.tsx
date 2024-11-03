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
import {
  getTeamColor,
  getTeamName
} from "@/lib/stableIdentifiers/teamIdentifier";

export const GameLobby = () => {
  const { gameInfo } = useGameStateSelector((s) => s.gameStateSlice);
  const player = useContext(PlayerContext);

  const [isLoading, setIsLoading] = useState(false);
  const [isJoiningTeam, setIsJoiningTeam] = useState(false);

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

  const thisPlayerTeam = gameInfo?.players.find(
    (p) => p.playerId === player.playerId
  )?.team;

  const canStartGame = () => {
    if (gameInfo === undefined) {
      return false;
    }

    return gameInfo.players.every((p) => p.team !== undefined);
  };

  const joinTeam = (team: number) => async () => {
    if (gameInfo === undefined) {
      return;
    }

    setIsJoiningTeam(true);
    const response = await ClientServiceCallers.gameState.updatePlayerInGame({
      gameId: gameInfo.gameId ?? "",
      playerId: player.playerId,
      team
    });
    setIsJoiningTeam(false);

    if (!isServiceError(response)) {
      return;
    }

    console.error(response);
  };

  const maybeRenderUndecided = () => {
    const undecided =
      gameInfo?.players.filter((p) => p.team === undefined) ?? [];
    if (undecided.length === 0) {
      return;
    }

    return (
      <Flex
        className={styles.players}
        gap="3"
        style={{ background: getTeamColor() }}
      >
        {undecided.map((p) => (
          <Flex justify="center" key={p.playerId}>
            <Text>{p.displayName}</Text>
          </Flex>
        ))}
      </Flex>
    );
  };

  const renderTeam = (team: number) => {
    const playersInTeam =
      gameInfo?.players.filter((p) => p.team === team) ?? [];

    return (
      <Flex direction="column">
        <Flex justify="center" mb="1">
          <Text size="4" weight="bold">
            {getTeamName(playersInTeam, team)}
          </Text>
        </Flex>
        <Flex
          className={styles.players}
          direction="column"
          gap="2"
          style={{ background: getTeamColor(team) }}
        >
          {playersInTeam.map((p) => (
            <Flex justify="center" key={p.playerId}>
              <Text>{p.displayName}</Text>
            </Flex>
          ))}
        </Flex>
        <Flex mt="2" px="4">
          <Button
            disabled={thisPlayerTeam === team}
            loading={isJoiningTeam}
            onClick={joinTeam(team)}
            variant="outline"
          >
            Join team
          </Button>
        </Flex>
      </Flex>
    );
  };

  return (
    <Flex direction="column" flex="1">
      <Flex>
        <GoHome />
      </Flex>
      <Flex className={styles.overallContainer} direction="column" gap="5">
        {maybeRenderUndecided()}
        <Flex align="baseline" gap="3">
          {renderTeam(0)}
          <Text>VS</Text>
          {renderTeam(1)}
        </Flex>
        <Flex justify="center">
          <Flex className={styles.players}>
            <Button
              disabled={!canStartGame()}
              loading={isLoading}
              onClick={onStartGame}
            >
              Start game
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
