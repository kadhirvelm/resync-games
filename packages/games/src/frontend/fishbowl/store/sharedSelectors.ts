import { createSelector } from "@reduxjs/toolkit";
import { FishbowlReduxState } from "./fishbowlRedux";
import { FishbowlRound } from "../../../backend";
import { selectTeamWithNames } from "../../shared/globalSelectors";
import { PlayerId, PlayerInGame } from "../../../../imports/api";

export type FishbowlPhase =
  | "word-contribution"
  | "active-player"
  | "waiting"
  | "finished"
  | FishbowlRound;

export const currentPhaseSelector = createSelector(
  [
    (state: FishbowlReduxState) => state.gameStateSlice.gameState?.round,
    (state: FishbowlReduxState) => state.playerSlice.player,
    (state: FishbowlReduxState) =>
      state.gameStateSlice.gameInfo?.currentGameState
  ],
  (round, player, currentGameState): FishbowlPhase => {
    if (currentGameState === "waiting") {
      return "waiting";
    }

    if (currentGameState === "finished") {
      return "finished";
    }

    if (round === undefined) {
      return "word-contribution";
    }

    if (round.currentActivePlayer.player.playerId === player?.playerId) {
      return "active-player";
    }

    return round;
  }
);

export const finalScoreSelector = createSelector(
  [
    selectTeamWithNames,
    (state: FishbowlReduxState) => state.gameStateSlice.gameState?.pastRounds,
    (state: FishbowlReduxState) => state.gameStateSlice.gameInfo?.players,
    (state: FishbowlReduxState) => state.gameStateSlice.gameState?.playerGuesses
  ],
  (teamWithNames, pastRounds, players, playerGuesses) => {
    if (
      teamWithNames === undefined ||
      players === undefined ||
      pastRounds === undefined ||
      playerGuesses === undefined
    ) {
      return;
    }

    const scoresByTeam: Record<
      number,
      {
        players: PlayerInGame[];
        primaryScore: number;
        secondaryScore: number;
        teamName: string;
      }
    > = Object.fromEntries(
      Object.entries(teamWithNames).map(([teamNumber, team]) => {
        return [
          teamNumber,
          {
            players: team.players,
            primaryScore: 0,
            secondaryScore: 0,
            teamName: team.teamName
          }
        ];
      })
    );

    // First get scores from the correct guesses from each round - when your team was active
    for (const round of pastRounds) {
      for (const guess of round.correctGuesses) {
        const maybeTeam = scoresByTeam[guess.guessingPlayer.team];
        if (maybeTeam === undefined) {
          throw new Error("Team not found when checking primary score");
        }

        maybeTeam.primaryScore += 1;
      }
    }

    const roundsScoredForSecondary: {
      [playerTeam: number]: {
        [roundNumber: number]: { [word: string]: boolean };
      };
    } = {};

    // Then go through the playerGuesses to get the scores for when the other team was active
    for (const playerId of Object.keys(playerGuesses) as PlayerId[]) {
      for (const [roundNumber, { guesses, player }] of Object.entries(
        playerGuesses[playerId] ?? {}
      )) {
        for (const guess of guesses) {
          if (
            guess.guessingPlayer.team === guess.currentActivePlayer.team ||
            guess.currentActiveWord.word !== guess.guess
          ) {
            continue;
          }

          // Make sure the team exists
          roundsScoredForSecondary[player.team] =
            roundsScoredForSecondary[player.team] ?? {};
          const maybeTeamSecondary = roundsScoredForSecondary[player.team];
          if (maybeTeamSecondary === undefined) {
            throw new Error("Team not found when checking secondary score");
          }

          // Make sure the round within the team exists
          const roundNumberInt = parseInt(roundNumber);
          maybeTeamSecondary[roundNumberInt] =
            maybeTeamSecondary[roundNumberInt] ?? {};
          const maybeRound = maybeTeamSecondary[roundNumberInt];
          if (maybeRound === undefined) {
            throw new Error("Round not found when checking secondary score");
          }

          // Check if another player on this team already scored this word
          if (maybeRound[guess.currentActiveWord.word]) {
            continue;
          }

          // If not, get the team and score it
          const maybeTeam = scoresByTeam[player.team];
          if (maybeTeam === undefined) {
            throw new Error("Team not found when checking secondary score");
          }

          // Score the word
          maybeRound[guess.currentActiveWord.word] = true;
          maybeTeam.secondaryScore += 1;
        }
      }
    }

    const teamEntries = Object.values(scoresByTeam).map((team) => ({
      ...team,
      totalScore: team.primaryScore + team.secondaryScore
    }));

    teamEntries.sort((a, b) => b.totalScore - a.totalScore);

    return {
      teamEntries
    };
  }
);
