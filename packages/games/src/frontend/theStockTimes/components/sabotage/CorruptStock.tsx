import { cycleTime } from "@resync-games/games-shared/theStockTimes/cycleTime";
import { useMemo, useState } from "react";
import { selectPlayerPortfolio } from "../../store/selectors";
import {
  updateTheStockTimesGameState,
  useGameStateDispatch,
  useGameStateSelector
} from "../../store/theStockTimesRedux";
import { ActivateStorePower } from "../store/ActivateStorePower";
import { Flex, Select } from "../../../components";

export const CORRUPT_STOCK_COOLDOWN = 3;

export const CorruptStock = () => {
  const dispatch = useGameStateDispatch();

  const player = useGameStateSelector((s) => s.playerSlice.player);
  const cycle = useGameStateSelector((s) => s.gameStateSlice.gameState?.cycle);
  const playerPortfolio = useGameStateSelector(selectPlayerPortfolio);

  const newsArticles = useGameStateSelector(
    (s) => s.gameStateSlice.gameState?.newsArticles
  );
  const stocks = useGameStateSelector(
    (s) => s.gameStateSlice.gameState?.stocks ?? {}
  );

  const sortedStock = useMemo(() => {
    return Object.entries(stocks).sort(([aSymbol], [bSymbol]) => {
      return aSymbol.localeCompare(bSymbol);
    });
  }, [stocks]);

  const [stockSelector, setStockSelector] = useState(sortedStock[0]?.[0]);

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
        items={sortedStock.map(([symbol, stock]) => ({
          label: `[${symbol}] ${stock.title}`,
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
