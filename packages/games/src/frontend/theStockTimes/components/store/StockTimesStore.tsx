import { cycleTime } from "@/imports/games-shared";
import { Flex, DisplayText } from "@/lib/radix";
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
            <DisplayText size="4" weight="bold">
              Take a loan
            </DisplayText>
          </Flex>
          <Flex flex="1">
            <ActivateStorePower onClick={onTakeLoan} storePower="loan" />
          </Flex>
        </Flex>
        <Flex direction="column" gap="1" p="2">
          <DisplayText>
            <DisplayText color="green">
              {displayDollar(loanAmount)} cash
            </DisplayText>{" "}
            for{" "}
            <DisplayText color="red">
              {displayDollar(loanDebt)} debt
            </DisplayText>
          </DisplayText>
          <DisplayText color="gray" size="2">
            Adds cash to your portfolio in exchange for debt. Debt only affects
            your end score and otherwise has no effect. It cannot be paid off.
          </DisplayText>
          <Flex justify="end">
            <DisplayText color="gray" size="2">
              {LOAN_COOLDOWN} day cooldown
            </DisplayText>
          </Flex>
        </Flex>
      </Flex>
      <Flex className={styles.storePower} direction="column">
        <Flex align="center" className={styles.powerName} p="2">
          <Flex flex="1">
            <DisplayText size="4" weight="bold">
              Transfer cash
            </DisplayText>
          </Flex>
        </Flex>
        <Flex direction="column" gap="1" p="2">
          <DisplayText color="gray" size="2">
            Move cash from your portfolio to a teammate's, up to 50% of your
            current cash.
          </DisplayText>
          <Flex py="2">
            <TransferCash />
          </Flex>
          <Flex justify="end">
            <DisplayText color="gray" size="2">
              {TRANSFER_CASH_COOLDOWN} day cooldown
            </DisplayText>
          </Flex>
        </Flex>
      </Flex>
      <Flex className={styles.storePower} direction="column">
        <Flex align="center" className={styles.powerName} p="2">
          <Flex flex="1">
            <DisplayText size="4" weight="bold">
              Losses into gains
            </DisplayText>
          </Flex>
          <Flex flex="1">
            <ActivateStorePower storePower="lossIntoGain" />
          </Flex>
        </Flex>
        <Flex direction="column" gap="1" p="2">
          <DisplayText color="gray" size="2">
            Converts losses into gains for 1 holding. In other words, if you
            have a <DisplayText color="red">$100.00</DisplayText> in losses,
            this power will convert it to a{" "}
            <DisplayText color="green">$100.00</DisplayText> in gains. Activate
            this on a holding with losses in the "your portfolio" section.
          </DisplayText>
          <Flex justify="end">
            <DisplayText color="gray" size="2">
              {SELL_INTO_GAIN_COOLDOWN} day cooldown
            </DisplayText>
          </Flex>
        </Flex>
      </Flex>
      <Flex className={styles.storePower} direction="column">
        <Flex align="center" className={styles.powerName} p="2">
          <Flex flex="1">
            <DisplayText size="4" weight="bold">
              2x buy with lock
            </DisplayText>
          </Flex>
          <Flex flex="1">
            <ActivateStorePower storePower="discountBuy" />
          </Flex>
        </Flex>
        <Flex direction="column" gap="1" p="2">
          <DisplayText color="gray" size="2">
            Buy 2x the stock for 1x the price, split into two holdings. However,
            both holdings will be locked for {LOCK_UP_TIME} days, preventing
            sale during this time. Activate this option on the purchase stock
            screen.
          </DisplayText>
          <DisplayText color="gray" size="2">
            Note this will be disabled at the start of day{" "}
            {(cycle?.endDay ?? 0) - LOCK_UP_TIME}.
          </DisplayText>
          <Flex justify="end">
            <DisplayText color="gray" size="2">
              {DISCOUNT_BUY_COOLDOWN} day cooldown
            </DisplayText>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
