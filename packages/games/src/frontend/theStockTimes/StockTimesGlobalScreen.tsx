import { Flex } from "../components";
import { useGameStateSelector } from "./store/theStockTimesRedux";

export const StockTimesGlobalScreen = () => {
  const gameInfo = useGameStateSelector((s) => s.gameStateSlice.gameInfo);
  const gameState = useGameStateSelector((s) => s.gameStateSlice.gameState);

  return (
    <Flex>
      {JSON.stringify(gameInfo, null, 2)}
      {JSON.stringify(gameState, null, 2)}
    </Flex>
  );
};
