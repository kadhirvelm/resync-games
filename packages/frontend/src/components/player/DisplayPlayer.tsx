import { Button, Flex } from "@/lib/radix";
import { useGameStateSelector } from "@/redux";
import { ClientServiceCallers } from "@/services/serviceCallers";
import { Text } from "@radix-ui/themes";
import { PlayerInGame } from "@resync-games/api";
import { SkullIcon, UnplugIcon } from "lucide-react";
import { useState } from "react";
import styles from "./DisplayPlayer.module.scss";
import { PlayerIcon } from "./PlayerIcon";

export const DisplayPlayer = ({ player }: { player: PlayerInGame }) => {
  const playerId = useGameStateSelector((s) => s.playerSlice.player?.playerId);
  const { gameInfo } = useGameStateSelector((s) => s.gameStateSlice);

  const [loading, setLoading] = useState(false);

  const onKickPlayer = async () => {
    if (gameInfo === undefined) {
      return;
    }

    setLoading(true);
    const { gameId, gameType } = gameInfo;
    await ClientServiceCallers.gameState.leaveGame({
      gameId,
      gameType,
      kick: true,
      playerId: player.playerId
    });
    setLoading(false);
  };

  const isDisconnected = player.connectionStatus === "disconnected";
  const isCurrentPlayer = playerId === player.playerId;
  const canKick = gameInfo !== undefined && !isCurrentPlayer && isDisconnected;

  return (
    <Flex align="center" gap="2">
      {canKick && (
        <Button loading={loading} onClick={onKickPlayer} variant="outline">
          <SkullIcon />
        </Button>
      )}
      <PlayerIcon dimension={30} name={player.displayName} />
      <Text size="4">{player.displayName}</Text>
      {isDisconnected && (
        <UnplugIcon className={styles.disconnected} size={18} />
      )}
    </Flex>
  );
};
