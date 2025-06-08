import { DisplayText, Flex } from "@/lib/radix";
import { getTeamColor } from "@/lib/stableIdentifiers/teamIdentifier";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { selectTeamWithNames } from "../../../shared/globalSelectors";
import { useFishbowlSelector } from "../../store/fishbowlRedux";
import { selectGuessesByTeam } from "../selectors/globalScreenSelectors";
import styles from "./CurrentGuesses.module.scss";
import { FishbowlSingleGuess } from "../../../../backend";
import { PlayerInGame } from "../../../../../imports/api";
import { PlayerIcon } from "@/components/player/PlayerIcon";

export const CurrentGuesses = () => {
  const teams = useFishbowlSelector(selectTeamWithNames);
  const guessesByTeam = useFishbowlSelector(selectGuessesByTeam);
  const timerState = useFishbowlSelector(
    (s) => s.gameStateSlice.gameState?.round?.currentActivePlayer.timer.state
  );

  if (teams === undefined || guessesByTeam === undefined) {
    return;
  }

  const maybeRenderGuesses = (
    teamGuesses: FishbowlSingleGuess[],
    players: PlayerInGame[]
  ) => {
    if (timerState !== "running") {
      return (
        <Flex
          align="center"
          direction="column"
          flex="1"
          gap="4"
          justify="center"
        >
          <DisplayText color="gray" size="7">
            {teamGuesses.length} guess{teamGuesses.length === 1 ? "" : "es"}
          </DisplayText>
          {players.map((p) => (
            <Flex align="center" gap="2" key={p.playerId}>
              <PlayerIcon dimension={25} player={p} />
              <DisplayText size="4">{p.displayName}</DisplayText>
            </Flex>
          ))}
        </Flex>
      );
    }

    return teamGuesses.map((guess, index) => {
      if (guess.guess === guessesByTeam.correctGuess) {
        return (
          <Flex direction="column" gap="2" key={guess.timestamp}>
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
          key={guess.timestamp}
          style={{ opacity }}
        >
          <DisplayText size="8">{guess.guess}</DisplayText>
          <DisplayText size="4">{guess.guessingPlayer.displayName}</DisplayText>
        </Flex>
      );
    });
  };

  return (
    <Flex flex="2">
      {Object.entries(teams).map(([teamNumber, { teamName, players }]) => {
        const teamGuesses =
          guessesByTeam.guessesByTeam[parseFloat(teamNumber)] ?? [];
        const isActiveTeam =
          guessesByTeam.currentActiveTeam === parseFloat(teamNumber);

        return (
          <Flex
            direction="column"
            flex="1"
            gap="7"
            key={teamNumber}
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
              {maybeRenderGuesses(teamGuesses, players)}
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
};
