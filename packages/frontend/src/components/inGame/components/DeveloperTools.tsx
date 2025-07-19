import { PlayerInGame } from "@resync-games/api";
import clsx from "clsx";
import {
  RefreshCwIcon,
  ReplaceIcon,
  SaveIcon,
  SettingsIcon
} from "lucide-react";
import { useContext, useMemo, useState } from "react";
import { EnvironmentContext } from "../../../context/Environment";
import { isServiceError } from "../../../imports/api";
import {
  Button,
  Dialog,
  DisplayText,
  Flex,
  TextField
} from "../../../lib/radix";
import {
  GameStateReduxSlice,
  LocalGameStateSlice,
  replaceLocalState,
  replaceState,
  useGameStateDispatch,
  useGameStateSelector
} from "../../../redux";
import {
  setPlayer as dispatchSetPlayer,
  PlayerSlice,
  replacePlayer
} from "../../../redux/stores/redux/playerSlice";
import { ClientServiceCallers } from "../../../services/serviceCallers";
import { DisplayPlayer } from "../../player";
import { getBrowserIdentifier } from "../../player/browserIdentifier";
import { PlayerContext } from "../../player/PlayerContext";
import styles from "./DeveloperTools.module.scss";

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

  const onResetGameToSnapshot = async () => {
    if (!state.gameStateSlice.gameInfo?.gameId) {
      return;
    }

    const response =
      await ClientServiceCallers.snapshotState.resetGameToSnapshot({
        gameId: state.gameStateSlice.gameInfo?.gameId
      });

    if (isServiceError(response)) {
      console.error(response);
      return;
    }

    dispatch(replaceState(response.gameStateSlice as GameStateReduxSlice));
    dispatch(
      replaceLocalState(response.localStateSlice as LocalGameStateSlice)
    );
    dispatch(replacePlayer(response.playerSlice as PlayerSlice));

    setOpen(false);
  };

  const onUpdateSnapshot = async () => {
    if (!state.gameStateSlice.gameInfo?.snapshotId) {
      return;
    }

    const gameType = state.gameStateSlice.gameInfo?.gameType;
    if (!gameType) {
      return;
    }

    const response =
      await ClientServiceCallers.snapshotState.updateSnapshotState({
        gameId: state.gameStateSlice.gameInfo?.gameId,
        newSnapshotState: {
          description,
          gameStateSlice: state.gameStateSlice,
          gameType,
          localStateSlice: state.localStateSlice,
          playerSlice: state.playerSlice
        },
        snapshotId: state.gameStateSlice.gameInfo?.snapshotId
      });

    if (isServiceError(response)) {
      console.error(response);
      return;
    }

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

  const maybeRenderResetGameToSnapshot = () => {
    if (!state.gameStateSlice.gameInfo?.hasSnapshotState) {
      return;
    }

    return (
      <Flex align="center" gap="2">
        <Flex flex="1">
          <Button onClick={onResetGameToSnapshot} variant="outline">
            <RefreshCwIcon size={16} /> Reset
          </Button>
        </Flex>
        <Flex flex="1">
          <Button onClick={onUpdateSnapshot} variant="outline">
            <ReplaceIcon size={16} /> Update
          </Button>
        </Flex>
      </Flex>
    );
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
      <Flex direction="column" gap="5" mb="2">
        <Flex direction="column" gap="2">
          <DisplayText color="gray" size="2">
            Snapshot state tools
          </DisplayText>
          {maybeRenderResetGameToSnapshot()}
          <Flex align="center" gap="2">
            <TextField
              onChange={(e) => setDescription(e)}
              placeholder="Description..."
              style={{ flex: 1 }}
              value={description}
            />
            <Flex>
              <Button loading={isLoading} onClick={handleSnapshot}>
                <SaveIcon size={16} /> Save
              </Button>
            </Flex>
          </Flex>
        </Flex>
        <Flex direction="column" gap="2">
          <DisplayText color="gray" size="2">
            Assume player
          </DisplayText>
          {players.map((p) => (
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
              <Flex align="center">
                <DisplayPlayer player={p} />
                <Flex ml="2">
                  {p.playerId === browserIdentifier && "(you)"}
                </Flex>
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
