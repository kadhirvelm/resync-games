import { Flex } from "../components";
import { Clock } from "./components/cycle/Clock";
import { FinalScoreboard } from "./components/FinalScoreboard";
import { useGameStateSelector } from "./store/theStockTimesRedux";

export const StockTimesGlobalScreen = () => {
  const gameInfo = useGameStateSelector((s) => s.gameStateSlice.gameInfo);
  const gameState = useGameStateSelector((s) => s.gameStateSlice.gameState);

  if (gameState === undefined) {
    return;
  }

  return (
    <Flex gap="2">
      <Flex flex="1">
        <FinalScoreboard />
      </Flex>
      {gameInfo?.currentGameState === "playing" && (
        <Flex flex="1">
          <Clock cycle={gameState?.cycle} size={window.innerWidth / 2} />
        </Flex>
      )}
    </Flex>
  );
};
