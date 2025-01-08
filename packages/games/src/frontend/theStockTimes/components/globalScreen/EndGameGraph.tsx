import { Flex } from "../../../components";
import { selectEndGameGraph, selectTeams } from "../../store/selectors";
import { useGameStateSelector } from "../../store/theStockTimesRedux";
import { MultiTimeSeries } from "../graph/MultiTimeSeries";

export const EndGameGraph = () => {
  const players = useGameStateSelector(selectEndGameGraph);
  const teams = useGameStateSelector(selectTeams);

  const cycle = useGameStateSelector((s) => s.gameStateSlice.gameState?.cycle);

  const xDates = Object.keys(Object.values(players)[0] ?? {}).map((v) =>
    parseFloat(v)
  );
  const [teamOne, teamTwo] = Object.values(players).map((team) =>
    Object.values(team ?? {}).map((v) => v)
  );

  const xAxisCursor = (value: number) => {
    if (cycle === undefined) {
      return;
    }

    const totalTimePerDay = cycle.dayTime + cycle.nightTime;

    const day = Math.floor(value / (cycle.dayTime + cycle.nightTime));
    const timeFraction = (value % totalTimePerDay) / totalTimePerDay;

    return `Day ${day} at ${Math.round(timeFraction * 100)}%`;
  };

  const xAxisLabel = (value: number) => {
    if (cycle === undefined) {
      return;
    }

    return Math.floor(value / (cycle.dayTime + cycle.nightTime)).toString();
  };

  return (
    <Flex flex="1" mb="4" p="4">
      <MultiTimeSeries
        x={xDates}
        xAxisCursor={xAxisCursor}
        xAxisLabel={xAxisLabel}
        y={[teamOne ?? [], teamTwo ?? []]}
        yLabels={[teams[0]?.teamName ?? "", teams[1]?.teamName ?? ""]}
      />
    </Flex>
  );
};
