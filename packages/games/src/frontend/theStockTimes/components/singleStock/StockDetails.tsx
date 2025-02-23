import { Stock } from "../../../../backend/theStockTimes/theStockTimes";
import { Flex, Text } from "../../../components";
import { useStockTimesSelector } from "../../store/theStockTimesRedux";
import styles from "./StockDetails.module.scss";

export const StockDetails = ({
  thisStock,
  viewingStockSymbol
}: {
  thisStock: Stock;
  viewingStockSymbol: string;
}) => {
  const maybeFocusedStock = useStockTimesSelector(
    (s) => s.gameStateSlice.gameState?.stockInFocus
  );

  const maybeRenderIndex = () => {
    if (maybeFocusedStock === undefined) {
      return;
    }

    return (
      <Text size="4" weight="bold">
        ({maybeFocusedStock.symbolIndex + 1} /{" "}
        {maybeFocusedStock.stockOrder.length})
      </Text>
    );
  };

  return (
    <Flex className={styles.details} direction="column" p="3">
      <Flex align="center" gap="4">
        <Text size="4" weight="bold">
          {maybeRenderIndex()} {viewingStockSymbol} - {thisStock.title}
        </Text>
      </Flex>
      <Text color="gray" mt="2" size="2">
        {thisStock.description}
      </Text>
    </Flex>
  );
};
