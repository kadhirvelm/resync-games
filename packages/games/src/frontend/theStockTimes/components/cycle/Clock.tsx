import clsx from "clsx";
import { StockTimesCycle } from "../../../../backend/theStockTimes/theStockTimes";
import { Flex } from "../../../components";
import { useCycleTime } from "../../hooks/cycleTime";
import styles from "./Clock.module.scss";
import { useGameStateSelector } from "../../store/theStockTimesRedux";
import { selectPlayerPortfolio } from "../../store/selectors";
import { isAvailable } from "../../hooks/utils/isAvailable";

const DEFAULT_SIZE = 75;

const radius = (size: number) => size / 2 - 1;
const centerX = (size: number) => size / 2;
const centerY = (size: number) => size / 2;

function calculateNightTimeArc(cycle: StockTimesCycle, size: number) {
  const percentNight = cycle.nightTime / (cycle.dayTime + cycle.nightTime);
  const angle = percentNight * 360;

  const endX =
    centerX(size) + radius(size) * Math.cos((angle - 90) * (Math.PI / 180));
  const endY =
    centerY(size) + radius(size) * Math.sin((angle - 90) * (Math.PI / 180));

  const largeArcFlag = angle > 180 ? 1 : 0;

  return `M ${centerX(size)} ${centerY(size)}
             L ${centerX(size)} ${centerY(size) - radius(size)}
             A ${radius(size)} ${radius(size)} 0 ${largeArcFlag} 1 ${endX} ${endY}
             Z`;
}

function calculateClockPointer(timeFraction: number, size: number) {
  const angle = timeFraction * 360;

  const endX =
    centerX(size) +
    radius(size) * Math.cos((angle - 90) * (Math.PI / 180)) * 0.95;
  const endY =
    centerY(size) +
    radius(size) * Math.sin((angle - 90) * (Math.PI / 180)) * 0.95;

  return `M ${centerX(size)} ${centerY(size)} L ${endX} ${endY}`;
}

export const Clock = ({
  cycle,
  size
}: {
  cycle: StockTimesCycle;
  size?: number;
}) => {
  const lockCashSpending = useGameStateSelector(
    selectPlayerPortfolio
  )?.lockCashSpending;
  const calculatedCycleTime = useCycleTime(cycle);
  const finalSize = size ?? DEFAULT_SIZE;

  const { day, timeFraction } = calculatedCycleTime;
  const isLocked = !isAvailable(
    cycle,
    lockCashSpending?.lockedAt,
    lockCashSpending?.availabilityTime
  ).isAvailable;

  return (
    <>
      <Flex
        className={clsx(styles.background, {
          [styles.day ?? ""]:
            calculatedCycleTime.currentCycle === "day" && !isLocked,
          [styles.night ?? ""]:
            calculatedCycleTime.currentCycle === "night" && !isLocked,
          [styles.locked ?? ""]: isLocked
        })}
      />
      <Flex align="center" gap="1">
        <svg height={finalSize} width={finalSize}>
          <circle
            className={styles.baseClock}
            cx={centerX(finalSize)}
            cy={centerY(finalSize)}
            r={radius(finalSize)}
          />
          <path
            className={styles.night}
            d={calculateNightTimeArc(cycle, finalSize)}
          />
          <path
            className={styles.pointer}
            d={calculateClockPointer(timeFraction, finalSize)}
            strokeWidth={finalSize / 20}
          />
          <circle
            cx={centerX(finalSize)}
            cy={centerY(finalSize)}
            fill="white"
            r={radius(finalSize) * 0.5}
            stroke="black"
          />
          <text
            className={clsx({
              [styles.lastDay ?? ""]: cycle.endDay - 1 === day
            })}
            dy=".3em"
            fontSize={finalSize / 5}
            textAnchor="middle"
            x={centerX(finalSize)}
            y={centerY(finalSize)}
          >
            {day}
          </text>
        </svg>
      </Flex>
    </>
  );
};
