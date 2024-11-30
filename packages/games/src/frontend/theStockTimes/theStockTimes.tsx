import { Flex } from "@/lib/radix/Flex";
import { useGameStateSelector } from "./store/theStockTimesRedux";
import { Text } from "@radix-ui/themes";

// { gameStateHandler }: FrontendGameComponentProps

export const DisplayTheStockTimes = () => {
  const gameState = useGameStateSelector((s) => s.gameStateSlice.gameState);

  if (gameState === undefined) {
    return;
  }

  return (
    <Flex direction="column" flex="1" m="auto">
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
