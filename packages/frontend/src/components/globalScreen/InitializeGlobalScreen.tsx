import { getFrontendGame } from "@/lib/utils/getFrontendGame";
import { GameStateHandler, GameStateReduxStore } from "@/redux";
import { useGameStateSocket } from "@/socket/useGameStateSocket";
import { GameId, GameType } from "@resync-games/api";
import { useContext, useMemo } from "react";
import { SocketStatus } from "../inGame/components/SocketStatus";
import { PlayerContext } from "../player/PlayerContext";
import { Flex } from "@/lib/radix";
import { Text } from "@radix-ui/themes";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

export const InitializeGlobalScreen = ({
  gameId,
  gameSlug,
  store
}: {
  gameId: GameId;
  gameSlug: GameType;
  store: GameStateReduxStore;
}) => {
  const player = useContext(PlayerContext);

  const { connectionStatus } = useGameStateSocket(gameId, gameSlug);
  const { isMobile } = useMediaQuery();

  const gameStateHandler = useMemo(() => {
    return new GameStateHandler(store, player);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId]);
  const accordingGame = getFrontendGame(gameSlug);

  if (isMobile) {
    return (
      <Flex align="center" flex="1" justify="center">
        <Text color="gray" size="2">
          Global screens must be displayed on a computer. Try accessing this
          page from a desktop instead.
        </Text>
      </Flex>
    );
  }

  return (
    <>
      {accordingGame.globalScreen?.({ gameStateHandler }) ?? (
        <Flex align="center" flex="1" justify="center">
          <Text color="gray">
            A global screen has not been configured for {gameSlug}
          </Text>
        </Flex>
      )}
      <SocketStatus connectionStatus={connectionStatus} />
    </>
  );
};
