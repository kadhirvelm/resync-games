import { Flex, Text } from "../../../components";
import { CORRUPT_STOCK_COOLDOWN, CorruptStock } from "./CorruptStock";
import styles from "./Sabotage.module.scss";

export const Sabotage = () => {
  return (
    <Flex direction="column" gap="2">
      <Flex className={styles.sabotagePower} direction="column">
        <Flex align="center" className={styles.powerName} p="2">
          <Flex flex="1">
            <Text size="4" weight="bold">
              Corrupt a stock
            </Text>
          </Flex>
        </Flex>
        <Flex direction="column" gap="1" p="2">
          <Text color="gray" size="2">
            Corrupts a stock's news article for the day, if there has been one
            published. Use this to prevent the opponents from using the article
            to their advantage, or to perhaps cut your losses.
          </Text>
          <Flex py="2">
            <CorruptStock />
          </Flex>
          <Flex justify="end">
            <Text color="gray" size="2">
              {CORRUPT_STOCK_COOLDOWN} day cooldown
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
