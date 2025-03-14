import { DisplayPlayer } from "@/components/player/DisplayPlayer";
import { Button } from "@/lib/radix/Button";
import { Flex } from "@/lib/radix/Flex";
import {
  getTeamColor,
  getTeamName
} from "@/lib/stableIdentifiers/teamIdentifier";
import { useGameStateSelector } from "@/redux";
import { ClientServiceCallers } from "@/services/serviceCallers";
import { Text } from "@radix-ui/themes";
import { isServiceError } from "@resync-games/api";
import { motion } from "motion/react";
import { useContext, useState } from "react";
import { PlayerContext } from "../player/PlayerContext";
import { GoHome } from "./components/GoHome";
import styles from "./GameLobby.module.scss";
import { canStartGame } from "./utils/canStartGame";
import { GameConfigurationSideBar } from "./components/GameConfigurationSideBar";

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

  const maybeCheckCanStartGame = () => {
    if (gameInfo === undefined) {
      return false;
    }

    return canStartGame(gameInfo);
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
      <Flex justify="center">
        <Flex
          className={styles.players}
          gap="3"
          mx="3"
          style={{ background: getTeamColor() }}
        >
          {undecided.map((p) => (
            <Flex justify="center" key={p.playerId}>
              <Text size="4">{p.displayName}</Text>
            </Flex>
          ))}
        </Flex>
      </Flex>
    );
  };

  const renderTeam = (team: number) => {
    const playersInTeam =
      gameInfo?.players.filter((p) => p.team === team) ?? [];

    const maybeRenderPlayers = () => {
      if (playersInTeam.length === 0) {
        return (
          <Flex align="center" justify="center">
            <Text color="gray" size="2">
              No players yet
            </Text>
          </Flex>
        );
      }

      return playersInTeam.map((p) => (
        <motion.div
          animate={{ x: 0 }}
          initial={{ x: -100 }}
          key={p.playerId}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <DisplayPlayer key={p.playerId} player={p} />
        </motion.div>
      ));
    };

    const teamName = getTeamName(playersInTeam, team);

    return (
      <Flex direction="column">
        <motion.div
          animate={{ opacity: 1, rotate: 0 }}
          initial={{ opacity: 0, rotate: -180 }}
          key={teamName}
          transition={{ delay: 0.5 }}
        >
          <Flex justify="center" mb="1">
            <Text size="4" weight="bold">
              {teamName}
            </Text>
          </Flex>
        </motion.div>
        <Flex
          className={styles.players}
          direction="column"
          gap="2"
          style={{ background: getTeamColor(team) }}
        >
          {maybeRenderPlayers()}
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
    <Flex flex="1">
      <Flex>
        <GoHome />
      </Flex>
      <GameConfigurationSideBar />
      <Flex direction="column" flex="4" gap="8" justify="center">
        {maybeRenderUndecided()}
        <Flex align="baseline" gap="3" justify="center">
          {renderTeam(0)}
          <Text>VS</Text>
          {renderTeam(1)}
        </Flex>
        <Flex justify="center">
          <Flex height="200px" width="25vw">
            <Button
              disabled={!maybeCheckCanStartGame()}
              loading={isLoading}
              onClick={onStartGame}
            >
              Start game!
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
