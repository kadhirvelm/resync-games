import { PlayerInGame } from "@resync-games/api";
import clsx from "clsx";
import { SettingsIcon } from "lucide-react";
import { useContext, useMemo, useState } from "react";
import {
  Button,
  Dialog,
  DisplayText,
  Flex,
  TextField
} from "../../../lib/radix";
import { useGameStateDispatch, useGameStateSelector } from "../../../redux";
import { ClientServiceCallers } from "../../../services/serviceCallers";
import { DisplayPlayer } from "../../player";
import { getBrowserIdentifier } from "../../player/browserIdentifier";
import { PlayerContext } from "../../player/PlayerContext";
import styles from "./DeveloperTools.module.scss";
import { setPlayer as dispatchSetPlayer } from "../../../redux/stores/redux/playerSlice";
import { EnvironmentContext } from "../../../context/Environment";

export const DeveloperTools = () => {
  const dispatch = useGameStateDispatch();

  const browserIdentifier = useMemo(() => getBrowserIdentifier(), []);
  const { player, setPlayer } = useContext(PlayerContext);
  const { developmentMode } = useContext(EnvironmentContext);

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState("");

  const state = useGameStateSelector((state) => state);
  const players = useGameStateSelector(
    (state) => state.gameStateSlice.gameInfo?.players ?? []
  );

  if (!developmentMode) {
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
      displayName: assumePlayer.displayName,
      playerId: assumePlayer.playerId,
      team: assumePlayer.team
    });

    dispatch(dispatchSetPlayer(assumePlayer));

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
          {players
            .filter((p) => p.playerId !== browserIdentifier)
            .map((p) => (
              <Flex
                className={clsx(styles.assumePlayer, {
                  [styles.active ?? ""]: player.playerId === p.playerId
                })}
                direction="column"
                flex="1"
                key={p.playerId}
                onClick={() => onAssumePlayer(p)}
                p="2"
              >
                <Flex>
                  <DisplayPlayer player={p} />
                </Flex>
                <DisplayText color="gray" size="2">
                  {p.playerId} ({p.team})
                </DisplayText>
              </Flex>
            ))}
        </Flex>
      </Flex>
    </Dialog>
  );
};
