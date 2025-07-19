import { DisplayPlayer } from "@/components/player/DisplayPlayer";
import { isServiceError } from "@/imports/api";
import { DisplayText } from "@/lib/radix";
import { Button } from "@/lib/radix/Button";
import { Flex } from "@/lib/radix/Flex";
import {
  getTeamColor,
  getTeamName
} from "@/lib/stableIdentifiers/teamIdentifier";
import { useGameStateSelector } from "@/redux";
import { ClientServiceCallers } from "@/services/serviceCallers";
import { DicesIcon } from "lucide-react";
import { motion } from "motion/react";
import { useContext, useState } from "react";
import { PlayerContext } from "../player/PlayerContext";
import { GameConfigurationSideBar } from "./components/GameConfigurationSideBar";
import { GoHome } from "./components/GoHome";
import styles from "./GameLobby.module.scss";
import { canStartGame } from "./utils/canStartGame";
import { useMediaQuery } from "../../lib/hooks/useMediaQuery";

export const GameLobby = () => {
  const { isMobile } = useMediaQuery();

  const { gameInfo } = useGameStateSelector((s) => s.gameStateSlice);
  const { player } = useContext(PlayerContext);

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
      avatarCollection: player.avatarCollection,
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

  const onShuffleTeams = async () => {
    if (gameInfo === undefined) {
      return;
    }

    setIsLoading(true);
    const response = await ClientServiceCallers.gameState.shuffleTeams({
      gameId: gameInfo.gameId,
      gameType: gameInfo.gameType
    });
    setIsLoading(false);

    if (!isServiceError(response)) {
      return;
    }

    console.error(response);
  };

  const renderInviteCode = () => {
    if (gameInfo === undefined) {
      return;
    }

    return (
      <Flex align="center" direction="column" justify="center" py="6">
        <Flex>
          <DisplayText color="gray" size="2">
            Invite code
          </DisplayText>
        </Flex>
        <Flex align="center" gap="1">
          {gameInfo.inviteCode.split("").map((character, index) => (
            <Flex
              className={styles.inviteCode}
              direction="column"
              gap="2"
              key={character + index}
              p="3"
            >
              <DisplayText size="8" weight="bold">
                {character.toUpperCase()}
              </DisplayText>
            </Flex>
          ))}
        </Flex>
      </Flex>
    );
  };

  const maybeRenderUndecided = () => {
    const undecided = gameInfo?.players.filter((p) => p.team === 0) ?? [];
    if (undecided.length === 0) {
      return;
    }

    return (
      <Flex direction="column">
        <DisplayText color="gray" mb="1" size="2">
          Undecided
        </DisplayText>
        <Flex
          className={styles.players}
          gap="3"
          style={{ background: getTeamColor(0) }}
        >
          {undecided.map((p) => (
            <Flex justify="center" key={p.playerId}>
              <DisplayPlayer key={p.playerId} player={p} />
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
            <DisplayText color="gray" size="2">
              No players yet
            </DisplayText>
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
      <Flex flex="1" gap="4">
        <motion.div
          animate={{ opacity: 1, rotate: 0 }}
          initial={{ opacity: 0, rotate: -180 }}
          key={teamName}
          transition={{ delay: 0.5 }}
        >
          <Flex justify="center" mt="2">
            <DisplayText size="9" weight="bold">
              {teamName}
            </DisplayText>
          </Flex>
        </motion.div>
        <Flex direction="column" flex="1" gap="2">
          <Flex
            className={styles.players}
            direction="column"
            gap="2"
            style={{ background: getTeamColor(team) }}
          >
            {maybeRenderPlayers()}
          </Flex>
          <Flex>
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
      </Flex>
    );
  };

  return (
    <Flex flex="1" py="9">
      <Flex>
        <GoHome />
      </Flex>
      <GameConfigurationSideBar />
      <Flex align="center" direction="column" flex="1">
        <Flex direction="column" width={isMobile ? "85vw" : "50vw"}>
          <Flex direction="column" gap="8">
            {renderInviteCode()}
            {maybeRenderUndecided()}
            <Flex direction="column" flex="1" gap="6">
              {renderTeam(1)}
              <Flex
                flex="1"
                gap="2"
                justify="center"
                style={{ paddingLeft: "68px" }}
              >
                <DisplayText size="5" weight="bold">
                  VS
                </DisplayText>
                <Flex>
                  <Button onClick={onShuffleTeams} variant="outline">
                    <DicesIcon />
                  </Button>
                </Flex>
              </Flex>
              {renderTeam(2)}
            </Flex>
          </Flex>
          <Flex align="center" flex="1" mb="5" minHeight="50px" mt="8">
            <Button
              disabled={!maybeCheckCanStartGame()}
              loading={isLoading}
              onClick={onStartGame}
              style={{ height: "100%" }}
            >
              Start!
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
