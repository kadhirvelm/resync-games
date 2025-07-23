import { DisplayText } from "@/lib/radix";
import { Flex } from "@/lib/radix/Flex";
import { useGameStateSelector } from "@/redux";
import styles from "../GameLobby.module.scss";

export const DisplayGameCode = () => {
  const { gameInfo } = useGameStateSelector((s) => s.gameStateSlice);

  if (gameInfo === undefined) {
    return;
  }

  return (
    <Flex align="center" direction="column" justify="center" py="6">
      <Flex>
        <DisplayText color="gray" size="2">
          Invite code
        </DisplayText>
      </Flex>
      <Flex align="center" gap="1">
        {gameInfo.inviteCode.split("").map((character, index) => (
          <Flex
            className={styles.inviteCode}
            direction="column"
            gap="2"
            key={character + index}
            p="3"
          >
            <DisplayText size="8" weight="bold">
              {character.toUpperCase()}
            </DisplayText>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};
