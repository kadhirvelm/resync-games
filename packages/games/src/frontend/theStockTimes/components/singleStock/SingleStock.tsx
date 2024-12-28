import { Flex } from "../../../components";
import { useGameStateSelector } from "../../store/theStockTimesRedux";
import { PriceGraph } from "./PriceGraph";
import { PurchaseStock } from "./PurchaseStock";
import { StockArticles } from "./StockArticles";
import { StockDetails } from "./StockDetails";

export const SingleStock = ({
  viewingStockSymbol
}: {
  viewingStockSymbol: string;
}) => {
  const stocks = useGameStateSelector(
    (s) => s.gameStateSlice.gameState?.stocks
  );
  const thisStock = stocks?.[viewingStockSymbol];

  if (thisStock === undefined) {
    return;
  }

  return (
    <Flex direction="column" flex="1" gap="3" mx="4">
      <StockDetails
        thisStock={thisStock}
        viewingStockSymbol={viewingStockSymbol}
      />
      <Flex>
        <StockArticles viewingStockSymbol={viewingStockSymbol} />
      </Flex>
      <PurchaseStock viewingStockSymbol={viewingStockSymbol} />
      <PriceGraph viewingStockSymbol={viewingStockSymbol} />
    </Flex>
  );
};
