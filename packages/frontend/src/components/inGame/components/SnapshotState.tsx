import { SettingsIcon } from "lucide-react";
import { useState } from "react";
import { Dialog, Flex, TextField } from "../../../lib/radix";
import { useGameStateSelector } from "../../../redux";
import { ClientServiceCallers } from "../../../services/serviceCallers";
import styles from "./SnapshotState.module.scss";

export const SnapshotState = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState("");

  const state = useGameStateSelector((state) => state);

  if (process.env.NEXT_PUBLIC_DEVELOPMENT_MODE !== "true") {
    return;
  }

  const handleSnapshot = async () => {
    const gameType = state.gameStateSlice.gameInfo?.gameType;
    if (!gameType) {
      return;
    }

    setIsLoading(true);
    ClientServiceCallers.gameState.snapshotState({
      description,
      gameStateSlice: state.gameStateSlice,
      gameType,
      localStateSlice: state.localStateSlice,
      playerSlice: state.playerSlice
    });
    setIsLoading(false);

    setOpen(false);
  };

  return (
    <Dialog
      isLoading={isLoading}
      onConfirm={handleSnapshot}
      onOpenChange={setOpen}
      open={open}
      title="Snapshot state"
      trigger={
        <Flex className={styles.snapshotState} onClick={() => setOpen(true)}>
          <SettingsIcon size={16} />
        </Flex>
      }
    >
      <Flex direction="column" gap="2" mb="2">
        <TextField
          onChange={(e) => setDescription(e)}
          placeholder="Description..."
          value={description}
        />
      </Flex>
    </Dialog>
  );
};
