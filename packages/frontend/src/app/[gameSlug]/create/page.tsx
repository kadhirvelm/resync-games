import { GAME_FRONTEND_REGISTRY, slugToGameKey } from "@resync-games/games";

export default async function Page({
  params
}: {
  params: { gameSlug: string };
}) {
  const { gameSlug } = params;
  const gameKey = slugToGameKey(gameSlug);
  if (!gameKey) {
    return <div>Game not found</div>;
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const component = GAME_FRONTEND_REGISTRY[gameKey]!;
  return <div>{component()}</div>;
}
