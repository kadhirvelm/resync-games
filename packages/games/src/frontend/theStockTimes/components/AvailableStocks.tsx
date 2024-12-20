import { useGameStateSelector } from "../store/theStockTimesRedux";
import { Flex, Text } from "../../components";

export const AvailableStocks = () => {
  const gameState = useGameStateSelector((s) => s.gameStateSlice.gameState);

  if (gameState === undefined) {
    return;
  }

  return (
    <Flex>
      {Object.entries(gameState.stocks).map(([stockSymbol, stock]) => (
        <Flex direction="column">
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
