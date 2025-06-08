import { DisplayText, Flex } from "@/lib/radix";
import { getTeamColor } from "@/lib/stableIdentifiers/teamIdentifier";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { selectTeamWithNames } from "../../../shared/globalSelectors";
import { useFishbowlSelector } from "../../store/fishbowlRedux";
import { selectGuessesByTeam } from "../selectors/globalScreenSelectors";
import styles from "./CurrentGuesses.module.scss";

export const CurrentGuesses = () => {
  const teams = useFishbowlSelector(selectTeamWithNames);
  const guessesByTeam = useFishbowlSelector(selectGuessesByTeam);

  if (teams === undefined || guessesByTeam === undefined) {
    return;
  }

  return (
    <Flex flex="2">
      {Object.entries(teams).map(([teamNumber, { teamName }]) => {
        const teamGuesses =
          guessesByTeam.guessesByTeam[parseFloat(teamNumber)] ?? [];
        const isActiveTeam =
          guessesByTeam.currentActiveTeam === parseFloat(teamNumber);

        return (
          <Flex
            direction="column"
            flex="1"
            gap="7"
            p="5"
            style={{ background: getTeamColor(parseFloat(teamNumber)) }}
          >
            <Flex align="center" gap="2" justify="center" mb="5">
              {isActiveTeam && <ArrowRightIcon size={30} />}
              <DisplayText size="7" weight="bold">
                {teamName}
              </DisplayText>
              {isActiveTeam && <ArrowLeftIcon size={30} />}
            </Flex>
            <Flex className={styles.guesses} direction="column" gap="4">
              {teamGuesses.map((guess, index) => {
                if (guess.guess === guessesByTeam.correctGuess) {
                  return (
                    <Flex direction="column" gap="2">
                      <DisplayText color="green" size="7" weight="bold">
                        {guess.guessingPlayer.displayName} got it!
                      </DisplayText>
                    </Flex>
                  );
                }

                const opacity = Math.max(0.1, 1 - (index - 4) * 0.15);

                return (
                  <Flex
                    align="center"
                    gap="2"
                    justify="between"
                    style={{ opacity }}
                  >
                    <DisplayText size="8">{guess.guess}</DisplayText>
                    <DisplayText size="4">
                      {guess.guessingPlayer.displayName}
                    </DisplayText>
                  </Flex>
                );
              })}
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
};
