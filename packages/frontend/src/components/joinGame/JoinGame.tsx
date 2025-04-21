import { Flex } from "@/lib/radix/Flex";
import { useContext, useState } from "react";
import { PlayerContext } from "../player/PlayerContext";
import { ClientServiceCallers } from "@/services/serviceCallers";
import { isServiceError } from "@resync-games/api";
import { Button, TextField } from "@/lib/radix";
import { Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

export function JoinGame() {
  const player = useContext(PlayerContext);
  const router = useRouter();

  const [inviteCode, setInviteCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [inviteError, setInviteError] = useState<string | null>(null);

  const onJoinGame = async () => {
    setIsLoading(true);
    const maybeGame = await ClientServiceCallers.gameState.joinGame({
      inviteCode,
      playerId: player.playerId
    });
    setIsLoading(false);

    if (isServiceError(maybeGame)) {
      setInviteError(maybeGame.message);
      return;
    }

    router.push(`/${maybeGame.gameType}/${maybeGame.gameId}`);
  };

  return (
    <Flex direction="column">
      <Flex gap="2">
        <TextField
          maxLength={5}
          onChange={setInviteCode}
          placeholder="Invite code..."
          size="3"
          value={inviteCode}
        />
        <Button
          disabled={inviteCode.length < 3}
          loading={isLoading}
          onClick={onJoinGame}
          size="3"
        >
          Join
        </Button>
      </Flex>
      {inviteError && (
        <Flex style={{ maxWidth: "275px" }}>
          <Text color="red" mt="1" size="2">
            {inviteError}
          </Text>
        </Flex>
      )}
    </Flex>
  );
}
