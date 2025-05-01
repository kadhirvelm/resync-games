import { cycleTime } from "@/imports/games-shared";
import { useState } from "react";
import { Flex, Select } from "@/lib/radix";
import {
  selectPlayerPortfolio,
  selectStocksWithOrder
} from "../../store/selectors";
import {
  updateTheStockTimesGameState,
  useStockTimesGameStateDispatch,
  useStockTimesSelector
} from "../../store/theStockTimesRedux";
import { ActivateStorePower } from "../store/ActivateStorePower";

export const CORRUPT_STOCK_COOLDOWN = 3;

export const CorruptStock = () => {
  const dispatch = useStockTimesGameStateDispatch();

  const player = useStockTimesSelector((s) => s.playerSlice.player);
  const cycle = useStockTimesSelector((s) => s.gameStateSlice.gameState?.cycle);
  const playerPortfolio = useStockTimesSelector(selectPlayerPortfolio);

  const newsArticles = useStockTimesSelector(
    (s) => s.gameStateSlice.gameState?.newsArticles
  );
  const stocks = useStockTimesSelector(selectStocksWithOrder);

  const [stockSelector, setStockSelector] = useState(stocks[0]?.symbol);

  const onCorruptStock = () => {
    if (
      player === undefined ||
      cycle === undefined ||
      playerPortfolio === undefined ||
      stockSelector === undefined ||
      stockSelector === ""
    ) {
      return;
    }

    const corruptedStockCooldown =
      (cycle.dayTime + cycle.nightTime) * CORRUPT_STOCK_COOLDOWN;
    const usedAt = cycleTime(cycle).currentTime;

    const newArticlesForStock = (
      newsArticles?.articles?.[stockSelector] ?? []
    ).slice();
    const maybeFirstArticle = newArticlesForStock[0];
    if (maybeFirstArticle === undefined) {
      return;
    }

    newArticlesForStock[0] = {
      ...maybeFirstArticle,
      corruptedOn: usedAt,
      lastUpdatedAt: new Date().toISOString()
    };

    dispatch(
      updateTheStockTimesGameState(
        {
          newsArticles: {
            ...newsArticles,
            articles: {
              ...(newsArticles?.articles ?? {}),
              [stockSelector]: newArticlesForStock
            },
            lastUpdatedAt: new Date().toISOString()
          },
          players: {
            [player.playerId]: {
              ...playerPortfolio,
              lastUpdatedAt: new Date().toISOString(),
              storePowers: {
                ...playerPortfolio.storePowers,
                corruptedStock: {
                  cooldownTime: corruptedStockCooldown,
                  usedAt
                }
              }
            }
          }
        },
        player
      )
    );

    setStockSelector("");
  };

  return (
    <Flex direction="column" flex="1" gap="2">
      <Select
        items={stocks.map(({ title, symbol, orderIndex }) => ({
          label: `(${orderIndex}) [${symbol}] ${title}`,
          value: symbol
        }))}
        onChange={setStockSelector}
        value={stockSelector}
      />
      <Flex flex="1">
        <ActivateStorePower
          disabled={stockSelector === undefined || stockSelector === ""}
          onClick={onCorruptStock}
          storePower="corruptedStock"
        />
      </Flex>
    </Flex>
  );
};
