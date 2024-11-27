import { getFrontendGame } from "@/lib/utils/getFrontendGame";
import { GameStateHandler } from "@/redux";
import { GameType } from "@resync-games/api";

const FetchGameEntry = ({
  gameStateHandler,
  gameSlug
}: {
  gameSlug: GameType;
  gameStateHandler: GameStateHandler<object, object>;
}) => {
  const accordingGame = getFrontendGame(gameSlug);
  return accordingGame.gameEntry({ gameStateHandler });
};

export default FetchGameEntry;
