import { Flex, Text } from "../components";
import { FrontendGameComponentProps } from "../frontendRegistry";
import { PauseAndPlay } from "./components/cycle/PauseAndPlay";
import { FinalScoreboard } from "./components/FinalScoreboard";
import { DesktopGame } from "./DesktopGame";
import { usePendingPlayerChanges } from "./hooks/pendingPlayerChanges";
import { MobileGame } from "./MobileGame";
import { useGameStateSelector } from "./store/theStockTimesRedux";

export const DisplayTheStockTimes = ({
  isMobile
}: FrontendGameComponentProps) => {
  usePendingPlayerChanges();

  const gameInfo = useGameStateSelector((s) => s.gameStateSlice.gameInfo);
  const gameState = useGameStateSelector((s) => s.gameStateSlice.gameState);

  if (gameInfo?.currentGameState === "finished") {
    return <FinalScoreboard />;
  }

  if (gameState === undefined) {
    return;
  }

  if (gameState.cycle.state === "paused") {
    return (
      <Flex align="center" flex="1" gap="3" justify="center">
        <Text color="gray">The game is paused</Text>
        <Flex>
          <PauseAndPlay />
        </Flex>
      </Flex>
    );
  }

  if (isMobile) {
    return <MobileGame gameState={gameState} />;
  }

  return <DesktopGame gameState={gameState} />;
};
