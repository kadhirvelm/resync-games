import clsx from "clsx";
import { Flex, Text } from "../../components";
import { selectTotalTeamValue } from "../store/selectors";
import { useGameStateSelector } from "../store/theStockTimesRedux";
import { displayDollar } from "../utils/displayDollar";
import styles from "./FinalScoreboard.module.scss";

export const FinalScoreboard = () => {
  const teams = useGameStateSelector(selectTotalTeamValue);

  return (
    <Flex align="center" direction="column" flex="1" gap="3" justify="center">
      {teams.map((team, index) => (
        <Flex
          className={clsx(styles.teamContainer, {
            [styles.gold ?? ""]: index === 0
          })}
          direction="column"
          gap="2"
          key={team.teamName ?? index}
          p="3"
        >
          <Flex align="center" gap="2">
            <Text size="8">{index + 1})</Text>
            <Text size="8">{team.teamName}</Text>
            <Flex className={styles.divider} mx="2" />
            <Text size="8">{displayDollar(team.totalValue)}</Text>
          </Flex>
          <Flex>{team.players?.map((p) => p.displayName).join(", ")}</Flex>
        </Flex>
      ))}
    </Flex>
  );
};
