import { DisplayText, Flex } from "@/lib/radix";
import { FrontendGameComponentProps } from "../frontendRegistry";
import { PauseAndPlay } from "./components/cycle/PauseAndPlay";
import { FinalScoreboard } from "./components/FinalScoreboard";
import { usePendingPlayerChanges } from "./hooks/pendingPlayerChanges";
import { StockTimesGameEntry } from "./StockTimesGameEntry";
import { useStockTimesSelector } from "./store/theStockTimesRedux";

export const DisplayTheStockTimes = ({
  isMobile
}: FrontendGameComponentProps) => {
  usePendingPlayerChanges();

  const gameInfo = useStockTimesSelector((s) => s.gameStateSlice.gameInfo);
  const gameState = useStockTimesSelector((s) => s.gameStateSlice.gameState);

  if (gameInfo?.currentGameState === "finished") {
    return (
      <Flex align="center" flex="1">
        <FinalScoreboard />
      </Flex>
    );
  }

  if (gameState === undefined) {
    return;
  }

  if (gameState.cycle.state === "paused") {
    return (
      <Flex align="center" flex="1" gap="3" justify="center">
        <DisplayText color="gray">The game is paused</DisplayText>
        <Flex>
          <PauseAndPlay />
        </Flex>
      </Flex>
    );
  }

  return <StockTimesGameEntry gameState={gameState} isMobile={isMobile} />;
};
