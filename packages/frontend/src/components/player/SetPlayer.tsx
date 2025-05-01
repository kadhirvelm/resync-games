import { GameId, isServiceError, Player } from "@/imports/api";
import { DisplayText } from "@/lib/radix";
import { Dialog } from "@/lib/radix/Dialog";
import { Flex } from "@/lib/radix/Flex";
import { TextField } from "@/lib/radix/TextField";
import { ClientServiceCallers } from "@/services/serviceCallers";
import { useMemo, useState } from "react";
import { getBrowserIdentifier } from "./browserIdentifier";
import { PlayerIcon } from "./PlayerIcon";
import styles from "./SetPlayer.module.scss";

export const SetPlayer = ({
  existingPlayer,
  gameId,
  onSetPlayer
}: {
  existingPlayer?: Player;
  gameId?: GameId;
  onSetPlayer: (player: Player) => void;
}) => {
  const browserIdentifier = useMemo(() => getBrowserIdentifier(), []);

  const [displayName, setDisplayName] = useState(
    existingPlayer?.displayName ?? ""
  );
  const [isLoading, setIsLoading] = useState(false);

  const createPlayer = async () => {
    setIsLoading(true);
    const player = await ClientServiceCallers.user.register({
      displayName,
      playerId: browserIdentifier
    });
    setIsLoading(false);

    if (isServiceError(player)) {
      console.error(player);
      return;
    }

    onSetPlayer(player);
  };

  const updatePlayerInIsolation = async (updatePlayer: Player) => {
    setIsLoading(true);
    const player = await ClientServiceCallers.user.update({
      displayName,
      playerId: updatePlayer.playerId
    });
    setIsLoading(false);

    if (isServiceError(player)) {
      console.error(player);
      return;
    }

    onSetPlayer(player);
  };

  const updatePlayerWithinGame = async (
    updatePlayer: Player,
    gameId: GameId
  ) => {
    setIsLoading(true);
    const player = await ClientServiceCallers.gameState.updatePlayerInGame({
      displayName,
      gameId: gameId,
      playerId: updatePlayer.playerId
    });
    setIsLoading(false);

    if (isServiceError(player)) {
      console.error(player);
      return;
    }

    const maybePlayer = player.players.find(
      (p) => p.playerId === updatePlayer.playerId
    );
    if (maybePlayer === undefined) {
      return;
    }

    onSetPlayer(maybePlayer);
  };

  const updatePlayer = async (updatePlayer: Player) => {
    setIsLoading(true);

    if (gameId === undefined) {
      updatePlayerInIsolation(updatePlayer);
    } else {
      updatePlayerWithinGame(updatePlayer, gameId);
    }
  };

  const onSavePlayer = async () => {
    if (existingPlayer === undefined) {
      return createPlayer();
    }

    return updatePlayer(existingPlayer);
  };

  const maybeRenderTrigger = () => {
    if (existingPlayer === undefined) {
      return;
    }

    return (
      <Flex align="center" className={styles.trigger} gap="2" px="3" py="1">
        <PlayerIcon dimension={25} name={existingPlayer.displayName} />
        <DisplayText>{existingPlayer.displayName}</DisplayText>
      </Flex>
    );
  };

  return (
    <Dialog
      defaultOpen={existingPlayer === undefined}
      onConfirm={onSavePlayer}
      title={existingPlayer === undefined ? "New player" : "Update player"}
      trigger={maybeRenderTrigger()}
    >
      <Flex direction="column" gap="2" my="5">
        <DisplayText color="gray" size="2">
          Player name
        </DisplayText>
        <Flex align="center" flex="1" gap="2">
          <PlayerIcon dimension={25} name={displayName} />
          <TextField
            isLoading={isLoading}
            onChange={setDisplayName}
            placeholder="Name here..."
            style={{ flex: 1 }}
            value={displayName}
          />
        </Flex>
      </Flex>
    </Dialog>
  );
};
