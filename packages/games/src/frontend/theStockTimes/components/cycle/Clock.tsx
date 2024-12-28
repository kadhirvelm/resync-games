import { CycleTime } from "@resync-games/games-shared/theStockTimes/cycleTime";
import { StockTimesCycle } from "../../../../backend/theStockTimes/theStockTimes";
import { Flex } from "../../../components";
import styles from "./Clock.module.scss";

const size = 75;

const radius = size / 2 - 1;
const centerX = size / 2;
const centerY = size / 2;

function calculateNightTimeArc(cycle: StockTimesCycle) {
  const percentNight = cycle.nightTime / (cycle.dayTime + cycle.nightTime);
  const angle = percentNight * 360;

  const endX = centerX + radius * Math.cos((angle - 90) * (Math.PI / 180));
  const endY = centerY + radius * Math.sin((angle - 90) * (Math.PI / 180));

  const largeArcFlag = angle > 180 ? 1 : 0;

  return `M ${centerX} ${centerY}
             L ${centerX} ${centerY - radius}
             A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}
             Z`;
}

function calculateClockPointer(timeFraction: number) {
  const angle = timeFraction * 360;

  const endX =
    centerX + radius * Math.cos((angle - 90) * (Math.PI / 180)) * 0.95;
  const endY =
    centerY + radius * Math.sin((angle - 90) * (Math.PI / 180)) * 0.95;

  return `M ${centerX} ${centerY} L ${endX} ${endY}`;
}

export const Clock = ({
  calculatedCycleTime,
  cycle
}: {
  calculatedCycleTime: CycleTime;
  cycle: StockTimesCycle;
}) => {
  const { day, timeFraction } = calculatedCycleTime;

  return (
    <Flex align="center" gap="1">
      <svg height={size} width={size}>
        <circle
          className={styles.baseClock}
          cx={centerX}
          cy={centerY}
          r={radius}
        />
        <path className={styles.night} d={calculateNightTimeArc(cycle)} />
        <path
          className={styles.pointer}
          d={calculateClockPointer(timeFraction)}
        />
        <circle
          cx={centerX}
          cy={centerY}
          fill="white"
          r={radius * 0.5}
          stroke="black"
        />
        <text dy=".3em" textAnchor="middle" x={centerX} y={centerY}>
          {day}
        </text>
      </svg>
    </Flex>
  );
};
