import { useContext } from "react";
import { Flex } from "../../../components";
import { useStockTimesSelector } from "../../store/theStockTimesRedux";
import { PriceGraph } from "./PriceGraph";
import { PurchaseStock } from "./PurchaseStock";
import { StockDetails } from "./StockDetails";
import { motion } from "motion/react";
import { DisplayType } from "../../utils/DisplayType";

export const SingleStock = ({
  viewingStockSymbol
}: {
  viewingStockSymbol: string;
}) => {
  const stocks = useStockTimesSelector(
    (s) => s.gameStateSlice.gameState?.stocks
  );
  const thisStock = stocks?.[viewingStockSymbol];

  const displayType = useContext(DisplayType);

  if (thisStock === undefined) {
    return;
  }

  const isGlobalScreen = displayType.displayType === "global-screen";

  return (
    <motion.div
      animate={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: 100 }}
      style={{ display: "flex", flex: "1" }}
    >
      <Flex direction="column" flex="1" gap="3" mx="4">
        <StockDetails
          thisStock={thisStock}
          viewingStockSymbol={viewingStockSymbol}
        />
        {!isGlobalScreen && (
          <PurchaseStock viewingStockSymbol={viewingStockSymbol} />
        )}
        {isGlobalScreen && (
          <PriceGraph viewingStockSymbol={viewingStockSymbol} />
        )}
      </Flex>
    </motion.div>
  );
};
