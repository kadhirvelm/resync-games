import { Stock } from "../../../../backend/theStockTimes/theStockTimes";
import { Flex, DisplayText } from "@/lib/radix";
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
      <DisplayText size="4" weight="bold">
        ({maybeFocusedStock.symbolIndex + 1} /{" "}
        {maybeFocusedStock.stockOrder.length})
      </DisplayText>
    );
  };

  return (
    <Flex className={styles.details} direction="column" p="3">
      <Flex align="center" gap="4">
        <DisplayText size="4" weight="bold">
          {maybeRenderIndex()} {viewingStockSymbol} - {thisStock.title}
        </DisplayText>
      </Flex>
      <DisplayText color="gray" mt="2" size="2">
        {thisStock.description}
      </DisplayText>
    </Flex>
  );
};
