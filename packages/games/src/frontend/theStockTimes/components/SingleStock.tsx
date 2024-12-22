import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Button, Flex, Text } from "../../components";
import {
  updateTheStockTimesLocalState,
  useGameStateDispatch,
  useGameStateSelector
} from "../store/theStockTimesRedux";

export const SingleStock = ({
  viewingStockSymbol
}: {
  viewingStockSymbol: string;
}) => {
  const dispatch = useGameStateDispatch();

  const stocks = useGameStateSelector(
    (s) => s.gameStateSlice.gameState?.stocks
  );
  const thisStock = stocks?.[viewingStockSymbol];

  if (thisStock === undefined) {
    return;
  }

  const onGoBack = () => {
    dispatch(updateTheStockTimesLocalState({ viewingStockSymbol: undefined }));
  };

  return (
    <Flex direction="column" gap="3" mx="4">
      <Flex direction="column">
        <Flex align="center" gap="2">
          <Flex>
            <Button onClick={onGoBack} variant="outline">
              <ArrowLeftIcon />
            </Button>
          </Flex>
          <Text size="4" weight="bold">
            {viewingStockSymbol} - {thisStock.title}
          </Text>
        </Flex>
        <Text color="gray" mt="2" size="2">
          {thisStock.description}
        </Text>
      </Flex>
    </Flex>
  );
};
