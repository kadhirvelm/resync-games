import { cycleTime } from "@resync-games/games-shared/theStockTimes/cycleTime";
import { Flex, Text } from "../../../components";
import {
  selectPlayerPortfolio,
  selectTotalTeamValue
} from "../../store/selectors";
import {
  updateTheStockTimesGameState,
  useStockTimesGameStateDispatch,
  useStockTimesSelector
} from "../../store/theStockTimesRedux";
import { displayDollar } from "../../utils/displayDollar";
import { ActivateStorePower } from "./ActivateStorePower";
import styles from "./StockTimesStore.module.scss";
import {
  DISCOUNT_BUY_COOLDOWN,
  LOCK_UP_TIME
} from "../singleStock/PurchaseStock";
import { SELL_INTO_GAIN_COOLDOWN } from "../playerPortfolio/SellPlayerStock";
import { TRANSFER_CASH_COOLDOWN, TransferCash } from "./powers/TransferCash";

const LOAN_AMOUNT = 0.25;
const LOAN_DEBT = 1.2;
const LOAN_COOLDOWN = 2.5;

export const StockTimesStore = () => {
  const dispatch = useStockTimesGameStateDispatch();

  const { player } = useStockTimesSelector((s) => s.playerSlice);
  const cycle = useStockTimesSelector((s) => s.gameStateSlice.gameState?.cycle);
  const playerPortfolio = useStockTimesSelector(selectPlayerPortfolio);
  const allTeamValues = useStockTimesSelector(selectTotalTeamValue);

  const loanAmount =
    (allTeamValues.reduce(
      (acc, teamValue) => acc + teamValue.averageTeamValue,
      0
    ) /
      allTeamValues.length) *
    LOAN_AMOUNT;
  const loanDebt = loanAmount * LOAN_DEBT;

  const onTakeLoan = () => {
    if (
      playerPortfolio === undefined ||
      player === undefined ||
      cycle === undefined
    ) {
      return;
    }

    const loanCooldown = (cycle.dayTime + cycle.nightTime) * LOAN_COOLDOWN;
    const usedAt = cycleTime(cycle).currentTime;

    dispatch(
      updateTheStockTimesGameState(
        {
          players: {
            [player.playerId]: {
              ...playerPortfolio,
              cash: playerPortfolio.cash + loanAmount,
              debt: playerPortfolio.debt + loanDebt,
              lastUpdatedAt: new Date().toISOString(),
              storePowers: {
                ...playerPortfolio.storePowers,
                loan: {
                  cooldownTime: loanCooldown,
                  usedAt
                }
              }
            }
          }
        },
        player
      )
    );
  };

  return (
    <Flex direction="column" gap="2">
      <Flex className={styles.storePower} direction="column">
        <Flex align="center" className={styles.powerName} p="2">
          <Flex flex="1">
            <Text size="4" weight="bold">
              Take a loan
            </Text>
          </Flex>
          <Flex flex="1">
            <ActivateStorePower onClick={onTakeLoan} storePower="loan" />
          </Flex>
        </Flex>
        <Flex direction="column" gap="1" p="2">
          <Text>
            <Text color="green">{displayDollar(loanAmount)} cash</Text> for{" "}
            <Text color="red">{displayDollar(loanDebt)} debt</Text>
          </Text>
          <Text color="gray" size="2">
            Adds cash to your portfolio in exchange for debt. Debt only affects
            your end score and otherwise has no effect. It cannot be paid off.
          </Text>
          <Flex justify="end">
            <Text color="gray" size="2">
              {LOAN_COOLDOWN} day cooldown
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex className={styles.storePower} direction="column">
        <Flex align="center" className={styles.powerName} p="2">
          <Flex flex="1">
            <Text size="4" weight="bold">
              Transfer cash
            </Text>
          </Flex>
        </Flex>
        <Flex direction="column" gap="1" p="2">
          <Text color="gray" size="2">
            Move cash from your portfolio to a teammate's, up to 50% of your
            current cash.
          </Text>
          <Flex py="2">
            <TransferCash />
          </Flex>
          <Flex justify="end">
            <Text color="gray" size="2">
              {TRANSFER_CASH_COOLDOWN} day cooldown
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex className={styles.storePower} direction="column">
        <Flex align="center" className={styles.powerName} p="2">
          <Flex flex="1">
            <Text size="4" weight="bold">
              Losses into gains
            </Text>
          </Flex>
          <Flex flex="1">
            <ActivateStorePower storePower="lossIntoGain" />
          </Flex>
        </Flex>
        <Flex direction="column" gap="1" p="2">
          <Text color="gray" size="2">
            Converts losses into gains for 1 holding. In other words, if you
            have a <Text color="red">$100.00</Text> in losses, this power will
            convert it to a <Text color="green">$100.00</Text> in gains.
            Activate this on a holding with losses in the "your portfolio"
            section.
          </Text>
          <Flex justify="end">
            <Text color="gray" size="2">
              {SELL_INTO_GAIN_COOLDOWN} day cooldown
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex className={styles.storePower} direction="column">
        <Flex align="center" className={styles.powerName} p="2">
          <Flex flex="1">
            <Text size="4" weight="bold">
              2x buy with lock
            </Text>
          </Flex>
          <Flex flex="1">
            <ActivateStorePower storePower="discountBuy" />
          </Flex>
        </Flex>
        <Flex direction="column" gap="1" p="2">
          <Text color="gray" size="2">
            Buy 2x the stock for 1x the price, split into two holdings. However,
            both holdings will be locked for {LOCK_UP_TIME} days, preventing
            sale during this time. Activate this option on the purchase stock
            screen.
          </Text>
          <Text color="gray" size="2">
            Note this will be disabled at the start of day{" "}
            {(cycle?.endDay ?? 0) - LOCK_UP_TIME}.
          </Text>
          <Flex justify="end">
            <Text color="gray" size="2">
              {DISCOUNT_BUY_COOLDOWN} day cooldown
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
