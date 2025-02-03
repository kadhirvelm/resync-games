import clsx from "clsx";
import { selectStocksAndSymbols } from "../../store/selectors";
import {
  updateTheStockTimesLocalState,
  useGameStateDispatch,
  useGameStateSelector
} from "../../store/theStockTimesRedux";
import styles from "./ArticleText.module.scss";
import { Flex } from "../../../components";

export const ArticleText = ({ text }: { text: string }) => {
  const dispatch = useGameStateDispatch();
  const stocksToSymbols = useGameStateSelector(selectStocksAndSymbols);

  const setViewingStockSymbol = (stockSymbol: string) => () => {
    dispatch(
      updateTheStockTimesLocalState({ viewingStockSymbol: stockSymbol })
    );
  };

  console.log(stocksToSymbols, "@@@");
  const tokens = text.split(" ");

  return (
    <Flex gap="1" wrap="wrap">
      {tokens.map((token, index) => {
        const accordingSymbol = stocksToSymbols[token];
        return (
          <span
            className={clsx({
              [styles.stock ?? ""]: accordingSymbol !== undefined
            })}
            key={index}
            onClick={
              accordingSymbol
                ? setViewingStockSymbol(accordingSymbol)
                : undefined
            }
          >
            {token}
          </span>
        );
      })}
    </Flex>
  );
};
