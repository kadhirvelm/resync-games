import { useGameStateSelector } from "../../../redux";
import { teamType } from "../utils/teamType";
import { DisplayTeams } from "./DisplayTeams";
import { DisplayUndecided } from "./DisplayUndecided";

export const DisplayTeamType = () => {
  const { gameInfo } = useGameStateSelector((s) => s.gameStateSlice);

  if (gameInfo === undefined) {
    return;
  }

  const type = teamType(gameInfo);

  if (type === "no-teams") {
    return <DisplayUndecided type={type} />;
  }

  return (
    <>
      <DisplayUndecided />
      <DisplayTeams />
    </>
  );
};
