import { GameId, GameType } from "@/imports/api";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { DisplayText, Flex } from "@/lib/radix";
import { getFrontendGame } from "@/lib/utils/getFrontendGame";
import { GameStateHandler, GameStateReduxStore } from "@/redux";
import { useGameStateSocket } from "@/socket/useGameStateSocket";
import { useContext, useMemo } from "react";
import { SocketStatus } from "../inGame/components/SocketStatus";
import { PlayerContext } from "../player/PlayerContext";

export const InitializeGlobalScreen = ({
  gameId,
  gameSlug,
  store
}: {
  gameId: GameId;
  gameSlug: GameType;
  store: GameStateReduxStore;
}) => {
  const { player } = useContext(PlayerContext);

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
        <DisplayText color="gray" size="2">
          Global screens must be displayed on a computer. Try accessing this
          page from a desktop instead.
        </DisplayText>
      </Flex>
    );
  }

  return (
    <>
      {accordingGame.globalScreen?.({ gameStateHandler }) ?? (
        <Flex align="center" flex="1" justify="center">
          <DisplayText color="gray">
            A global screen has not been configured for {gameSlug}
          </DisplayText>
        </Flex>
      )}
      <SocketStatus connectionStatus={connectionStatus} />
    </>
  );
};
