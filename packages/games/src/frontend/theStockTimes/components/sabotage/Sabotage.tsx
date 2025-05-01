import { Flex, DisplayText } from "@/lib/radix";
import { CASH_LOCK_DURATION, CASH_LOCK_COOLDOWN, CashLock } from "./CashLock";
import { CORRUPT_STOCK_COOLDOWN, CorruptStock } from "./CorruptStock";
import styles from "./Sabotage.module.scss";
import {
  STOCK_LOCK_COOLDOWN,
  STOCK_LOCK_DURATION,
  StockLock
} from "./StockLock";

export const Sabotage = () => {
  return (
    <Flex direction="column" gap="2">
      <Flex className={styles.sabotagePower} direction="column">
        <Flex align="center" className={styles.powerName} p="2">
          <Flex flex="1">
            <DisplayText size="4" weight="bold">
              Corrupt a stock
            </DisplayText>
          </Flex>
        </Flex>
        <Flex direction="column" gap="1" p="2">
          <DisplayText color="gray" size="2">
            Corrupts a stock's news article for the day, if there has been one
            published. Use this to prevent the opponents from using the article
            to their advantage, or to perhaps cut your losses.
          </DisplayText>
          <Flex py="2">
            <CorruptStock />
          </Flex>
          <Flex justify="end">
            <DisplayText color="gray" size="2">
              {CORRUPT_STOCK_COOLDOWN} day cooldown
            </DisplayText>
          </Flex>
        </Flex>
      </Flex>
      <Flex className={styles.sabotagePower} direction="column">
        <Flex align="center" className={styles.powerName} p="2">
          <Flex flex="1">
            <DisplayText size="4" weight="bold">
              Cash lock
            </DisplayText>
          </Flex>
        </Flex>
        <Flex direction="column" gap="1" p="2">
          <DisplayText color="gray" size="2">
            Prevents a player from spending their cash for {CASH_LOCK_DURATION}{" "}
            days. Use this to prevent a player from purchasing stock.
          </DisplayText>
          <Flex py="2">
            <CashLock />
          </Flex>
          <Flex justify="end">
            <DisplayText color="gray" size="2">
              {CASH_LOCK_COOLDOWN} day cooldown
            </DisplayText>
          </Flex>
        </Flex>
      </Flex>
      <Flex className={styles.sabotagePower} direction="column">
        <Flex align="center" className={styles.powerName} p="2">
          <Flex flex="1">
            <DisplayText size="4" weight="bold">
              Stock lock
            </DisplayText>
          </Flex>
        </Flex>
        <Flex direction="column" gap="1" p="2">
          <DisplayText color="gray" size="2">
            Prevents a player from selling a specific stock for{" "}
            {STOCK_LOCK_DURATION} days. Use this to prevent a player from
            selling a specific stock.
          </DisplayText>
          <Flex py="2">
            <StockLock />
          </Flex>
          <Flex justify="end">
            <DisplayText color="gray" size="2">
              {STOCK_LOCK_COOLDOWN} day cooldown
            </DisplayText>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
