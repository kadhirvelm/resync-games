import { motion } from "motion/react";
import { useContext } from "react";
import { Flex } from "@/lib/radix";
import { useStockTimesSelector } from "../../store/theStockTimesRedux";
import { DisplayType } from "../../utils/DisplayType";
import { DayArticles } from "../DayArticles";
import { PriceGraph } from "./PriceGraph";
import { PurchaseStock } from "./PurchaseStock";
import { StockDetails } from "./StockDetails";
import { selectFocusedStockData } from "../../store/selectors";
import { FocusedStockTimer } from "./FocusedStockTimer";

export const FocusedStock = () => {
  const stocks = useStockTimesSelector(selectFocusedStockData);
  const displayType = useContext(DisplayType);

  if (stocks === undefined || stocks.stock === undefined) {
    return;
  }

  const { stock, symbol } = stocks;
  const isGlobalScreen = displayType.displayType === "global-screen";

  return (
    <motion.div
      animate={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: 100 }}
      style={{ display: "flex", flex: "1" }}
    >
      <Flex direction="column" flex="1" gap="3" mx="4">
        <FocusedStockTimer />
        <StockDetails thisStock={stock} viewingStockSymbol={symbol} />
        {isGlobalScreen && <DayArticles />}
        {!isGlobalScreen && <PurchaseStock viewingStockSymbol={symbol} />}
        {isGlobalScreen && <PriceGraph stock={stock} />}
      </Flex>
    </motion.div>
  );
};
