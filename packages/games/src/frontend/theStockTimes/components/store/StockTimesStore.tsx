import { Flex, Text } from "../../../components";
import {
  selectPlayerPortfolio,
  selectTotalTeamValue
} from "../../store/selectors";
import {
  updateTheStockTimesGameState,
  useGameStateDispatch,
  useGameStateSelector
} from "../../store/theStockTimesRedux";
import { displayDollar } from "../../utils/displayDollar";
import { ActivateStorePower } from "./ActivateStorePower";
import styles from "./StockTimesStore.module.scss";

const LOAN_AMOUNT = 0.25;
const LOAN_DEBT = 1.2;
const LOAN_COOLDOWN = 2.5;

export const StockTimesStore = () => {
  const dispatch = useGameStateDispatch();

  const { player } = useGameStateSelector((s) => s.playerSlice);
  const cycle = useGameStateSelector((s) => s.gameStateSlice.gameState?.cycle);
  const playerPortfolio = useGameStateSelector(selectPlayerPortfolio);
  const allTeamValues = useGameStateSelector(selectTotalTeamValue);

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
                  unlocksAt: new Date(Date.now() + loanCooldown).toISOString()
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
    <Flex direction="column">
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
              2.5 day cooldown
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
