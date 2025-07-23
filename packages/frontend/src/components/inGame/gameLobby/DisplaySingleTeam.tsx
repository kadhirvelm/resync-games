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
import { motion } from "motion/react";
import { useContext, useState } from "react";
import { PlayerContext } from "../../player/PlayerContext";
import styles from "../GameLobby.module.scss";

interface DisplaySingleTeamProps {
  team: number;
}

export const DisplaySingleTeam = ({ team }: DisplaySingleTeamProps) => {
  const { gameInfo } = useGameStateSelector((s) => s.gameStateSlice);
  const { player } = useContext(PlayerContext);

  const [isJoiningTeam, setIsJoiningTeam] = useState(false);

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

  const thisPlayerTeam = gameInfo?.players.find(
    (p) => p.playerId === player.playerId
  )?.team;

  const playersInTeam = gameInfo?.players.filter((p) => p.team === team) ?? [];

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
