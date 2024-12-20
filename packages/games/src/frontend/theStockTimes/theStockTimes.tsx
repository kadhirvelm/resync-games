import { Flex, Text } from "../components";
import { useGameStateSelector } from "./store/theStockTimesRedux";
import { AvailableStocks } from "./components/AvailableStocks";
import { PlayerPortfolio } from "./components/PlayerPortfolio";

export const DisplayTheStockTimes = () => {
  const gameState = useGameStateSelector((s) => s.gameStateSlice.gameState);

  if (gameState === undefined) {
    return;
  }

  return (
    <Flex flex="1">
      <Text>Hello world</Text>
      <PlayerPortfolio />
      <AvailableStocks />
    </Flex>
  );
};
