import { PlayerInGame } from "@resync-games/api";
import { SettingsIcon } from "lucide-react";
import { useContext, useState } from "react";
import {
  Button,
  Dialog,
  DisplayText,
  Flex,
  TextField
} from "../../../lib/radix";
import { useGameStateSelector } from "../../../redux";
import { ClientServiceCallers } from "../../../services/serviceCallers";
import { DisplayPlayer } from "../../player";
import { PlayerContext } from "../../player/PlayerContext";
import styles from "./DeveloperTools.module.scss";

export const DeveloperTools = () => {
  const { player, setPlayer } = useContext(PlayerContext);

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState("");

  const state = useGameStateSelector((state) => state);
  const players = useGameStateSelector(
    (state) => state.gameStateSlice.gameInfo?.players ?? []
  );

  if (process.env.NEXT_PUBLIC_DEVELOPMENT_MODE !== "true") {
    return;
  }

  const handleSnapshot = async () => {
    const gameType = state.gameStateSlice.gameInfo?.gameType;
    if (!gameType) {
      return;
    }

    setIsLoading(true);
    ClientServiceCallers.snapshotState.snapshotState({
      description,
      gameStateSlice: state.gameStateSlice,
      gameType,
      localStateSlice: state.localStateSlice,
      playerSlice: state.playerSlice
    });
    setIsLoading(false);

    setOpen(false);
  };

  const onAssumePlayer = (assumePlayer: PlayerInGame) => {
    setPlayer({
      ...player,
      avatarCollection: assumePlayer.avatarCollection,
      connectionStatus: "connected",
      playerId: assumePlayer.playerId,
      team: assumePlayer.team
    });

    setOpen(false);
  };

  return (
    <Dialog
      isLoading={isLoading}
      onOpenChange={setOpen}
      open={open}
      title="Developer mode"
      trigger={
        <Flex className={styles.snapshotState} onClick={() => setOpen(true)}>
          <SettingsIcon size={16} />
        </Flex>
      }
    >
      <Flex direction="column" gap="4" mb="2">
        <Flex direction="column" gap="2">
          <DisplayText color="gray" size="2">
            Snapshot state
          </DisplayText>
          <Flex align="center" gap="2">
            <TextField
              onChange={(e) => setDescription(e)}
              placeholder="Description..."
              style={{ flex: 1 }}
              value={description}
            />
            <Flex>
              <Button loading={isLoading} onClick={handleSnapshot}>
                Snapshot
              </Button>
            </Flex>
          </Flex>
        </Flex>
        <Flex direction="column" gap="2">
          <DisplayText color="gray" size="2">
            Assume player
          </DisplayText>
          {players.map((player) => (
            <Flex
              className={styles.assumePlayer}
              direction="column"
              key={player.playerId}
              onClick={() => onAssumePlayer(player)}
              p="2"
            >
              <DisplayPlayer player={player} />
              <DisplayText color="gray" size="2">
                {player.playerId} ({player.team})
              </DisplayText>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Dialog>
  );
};
