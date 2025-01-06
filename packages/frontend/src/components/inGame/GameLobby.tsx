import { Button } from "@/lib/radix/Button";
import { Flex } from "@/lib/radix/Flex";
import {
  getTeamColor,
  getTeamName
} from "@/lib/stableIdentifiers/teamIdentifier";
import { useGameStateSelector } from "@/redux";
import { ClientServiceCallers } from "@/services/serviceCallers";
import { ClipboardCopyIcon, OpenInNewWindowIcon } from "@radix-ui/react-icons";
import { Text } from "@radix-ui/themes";
import { isServiceError } from "@resync-games/api";
import copy from "copy-to-clipboard";
import { useContext, useState } from "react";
import { PlayerContext } from "../player/PlayerContext";
import { ConfigureGame } from "./components/ConfigureGame";
import { GoHome } from "./components/GoHome";
import styles from "./GameLobby.module.scss";
import { canStartGame } from "./utils/canStartGame";
import { TutorialScreen } from "./components/TutorialScreen";

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

  const renderRoomName = () => {
    if (gameInfo === undefined) {
      return;
    }

    const { gameName } = gameInfo;

    const copyGameLink = () => copy(window.location.href);
    const openGlobalScreen = () =>
      window.open(`${window.location.href}/global`, "_blank");

    return (
      <Flex direction="column" gap="3">
        <Flex align="center">
          <Text size="8" weight="bold">
            {gameName}
          </Text>
        </Flex>
        <Flex
          align="center"
          className={styles.inviteLink}
          gap="3"
          onClick={copyGameLink}
        >
          <Text>Invite link</Text>
          <ClipboardCopyIcon />
        </Flex>
        <Flex
          align="center"
          className={styles.inviteLink}
          gap="3"
          onClick={openGlobalScreen}
        >
          <Text
            onClick={() =>
              window.open(`${window.location.href}/global`, "_blank")
            }
          >
            Global screen
          </Text>
          <OpenInNewWindowIcon />
        </Flex>
      </Flex>
    );
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
        <Flex justify="center" key={p.playerId}>
          <Text size="4">{p.displayName}</Text>
        </Flex>
      ));
    };

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
      <Flex
        className={styles.configuration}
        direction="column"
        flex="1"
        gap="5"
        p="8"
      >
        {renderRoomName()}
        <TutorialScreen key={gameInfo?.gameId + "tutorial"} />
        <Flex direction="column" gap="4">
          <Text color="gray" size="2">
            Game configuration
          </Text>
          <ConfigureGame key={gameInfo?.gameId + "configure"} />
        </Flex>
      </Flex>
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
