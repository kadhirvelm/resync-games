import clsx from "clsx";
import { selectStocksAndSymbols } from "../../store/selectors";
import {
  updateTheStockTimesLocalState,
  useStockTimesGameStateDispatch,
  useStockTimesSelector
} from "../../store/theStockTimesRedux";
import styles from "./ArticleText.module.scss";

export const ArticleText = ({ text }: { text: string }) => {
  const dispatch = useStockTimesGameStateDispatch();
  const stocksToSymbols = useStockTimesSelector(selectStocksAndSymbols);

  const setViewingStockSymbol = (stockSymbol: string) => () => {
    dispatch(
      updateTheStockTimesLocalState({
        viewingStockSymbol: stockSymbol,
        viewingTab: "stocks"
      })
    );
  };

  const tokens = text.split(/(?=\s|')/g);

  return (
    <>
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
    </>
  );
};
