import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { getFrontendGame } from "@/lib/utils/getFrontendGame";
import { GameStateHandler } from "@/redux";
import { GameType } from "@/imports/api";

const FetchGameEntry = ({
  gameStateHandler,
  gameSlug
}: {
  gameSlug: GameType;
  gameStateHandler: GameStateHandler<object, object>;
}) => {
  const accordingGame = getFrontendGame(gameSlug);
  const { isMobile } = useMediaQuery();

  return accordingGame.gameEntry({ gameStateHandler, isMobile });
};

export default FetchGameEntry;
