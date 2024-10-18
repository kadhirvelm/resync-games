import { Dialog } from "@/lib/radix/Dialog";
import { Flex } from "@/lib/radix/Flex";
import { isServiceError, Player } from "@resync-games/api";
import { useMemo, useState } from "react";
import { Text } from "@radix-ui/themes";
import { TextField } from "@/lib/radix/TextField";
import { ClientServiceCallers } from "@/services/serviceCallers";
import { getBrowserIdentifier } from "./browserIdentifier";

export const SetPlayer = ({
  onSetPlayer
}: {
  onSetPlayer: (player: Player) => void;
}) => {
  const browserIdentifier = useMemo(() => getBrowserIdentifier(), []);

  const [displayName, setDisplayName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSavePlayer = async () => {
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

  return (
    <Dialog onConfirm={onSavePlayer} open={true} title="New player">
      <Flex direction="column" gap="2" my="5">
        <Text color="gray" size="2">
          Player name
        </Text>
        <TextField
          isLoading={isLoading}
          onChange={setDisplayName}
          placeholder="Name here..."
          value={displayName}
        />
      </Flex>
    </Dialog>
  );
};
