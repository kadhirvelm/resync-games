import { Flex } from "@/lib/radix/Flex";
import { useGameStateSelector } from "@/redux";
import { GoHome } from "./components/GoHome";

export const GameLobby = () => {
  const { gameInfo } = useGameStateSelector((s) => s.gameStateSlice);

  return (
    <Flex direction="column" flex="1">
      <Flex>
        <GoHome />
      </Flex>
      <Flex direction="column" gap="2" m="auto">
        {gameInfo?.players.map((p) => (
          <Flex key={p.playerId}>{p.displayName}</Flex>
        ))}
      </Flex>
    </Flex>
  );
};
