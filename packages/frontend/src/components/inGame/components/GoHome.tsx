import { NavigationButton } from "@/lib/resync-components/NavigationButton";
import { ExitIcon } from "@radix-ui/react-icons";
import style from "./GoHome.module.scss";
import { PlayerContext } from "@/components/player/PlayerContext";
import { useGameStateSelector } from "@/redux";
import { ClientServiceCallers } from "@/services/serviceCallers";
import { isServiceError } from "@/imports/api";
import { useContext } from "react";

export const GoHome = () => {
  const player = useContext(PlayerContext);
  const { gameInfo } = useGameStateSelector((s) => s.gameStateSlice);

  const onLeave = async () => {
    if (gameInfo === undefined) {
      return;
    }

    const result = await ClientServiceCallers.gameState.leaveGame({
      gameId: gameInfo.gameId,
      gameType: gameInfo.gameType,
      playerId: player.playerId
    });

    if (!isServiceError(result)) {
      return;
    }

    throw new Error(result.message);
  };

  return (
    <NavigationButton
      className={style.goHome}
      href="/"
      onNavigation={onLeave}
      variant="outline"
    >
      <ExitIcon />
    </NavigationButton>
  );
};
