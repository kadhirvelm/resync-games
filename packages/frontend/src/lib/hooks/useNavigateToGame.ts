import { PlayerInGameWithDetails } from "@/imports/api";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export function useNavigateToGame(
  player: PlayerInGameWithDetails | undefined | null
) {
  const pathName = usePathname();
  const router = useRouter();

  const expectedPath = (() => {
    if (
      player == null ||
      player.gameId === undefined ||
      player.gameType === undefined
    ) {
      return;
    }

    return `/${player.gameType}/${player.gameId}`;
  })();

  useEffect(() => {
    if (player == null || expectedPath === undefined) {
      return;
    }

    if (pathName === expectedPath || player.hasExited) {
      return;
    }

    router.push(expectedPath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player]);

  const pathNotMatching =
    expectedPath !== undefined && expectedPath !== pathName;
  const hasPlayerExcited = player != null && player.hasExited;
  const needsToNavigate = pathNotMatching && !hasPlayerExcited;

  return {
    isLoading: player == null || needsToNavigate
  };
}
