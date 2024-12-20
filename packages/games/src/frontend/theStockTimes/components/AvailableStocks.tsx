import { useGameStateSelector } from "../store/theStockTimesRedux";
import { Flex, Text } from "../../components";

export const AvailableStocks = () => {
  const gameState = useGameStateSelector((s) => s.gameStateSlice.gameState);

  if (gameState === undefined) {
    return;
  }

  return (
    <Flex direction="column" flex="2" mx="4">
      {Object.entries(gameState.stocks).map(([stockSymbol, stock]) => (
        <Flex direction="column" key={stockSymbol}>
          <Text>
            {stockSymbol}: {stock.title} (${stock.history[0]?.price})
          </Text>
          <Text color="gray" size="2">
            {stock.description}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
};
