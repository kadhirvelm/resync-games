import { DisplayText, Flex } from "@/lib/radix";
import { selectTeamWithNames } from "../../../../shared/globalSelectors";
import { useFishbowlSelector } from "../../../store/fishbowlRedux";
import { selectGuessesByTeam } from "../../../store/globalScreenSelectors";
import { getTeamColor } from "@/lib/stableIdentifiers/teamIdentifier";

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

        return (
          <Flex
            direction="column"
            flex="1"
            gap="5"
            p="5"
            style={{ background: getTeamColor(parseFloat(teamNumber)) }}
          >
            <Flex justify="center">
              <DisplayText size="7" weight="bold">
                {teamName}
              </DisplayText>
            </Flex>
            {teamGuesses.map((guess) => {
              if (guess.guess === guessesByTeam.correctGuess) {
                return (
                  <Flex direction="column" gap="2">
                    <DisplayText color="green" size="7" weight="bold">
                      {guess.guessingPlayer.displayName} got it!
                    </DisplayText>
                  </Flex>
                );
              }

              return (
                <Flex gap="2" justify="between">
                  <DisplayText size="7">{guess.guess}</DisplayText>
                  <DisplayText size="4">
                    {guess.guessingPlayer.displayName}
                  </DisplayText>
                </Flex>
              );
            })}
          </Flex>
        );
      })}
    </Flex>
  );
};
