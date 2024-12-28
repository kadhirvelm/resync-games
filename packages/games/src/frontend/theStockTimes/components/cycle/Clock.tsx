import { cycleTime } from "@resync-games/games-shared/theStockTimes/cycleTime";
import { StockTimesCycle } from "../../../../backend/theStockTimes/theStockTimes";
import { Flex, Text } from "../../../components";
import styles from "./Clock.module.scss";
import { useEffect, useState } from "react";

function calculateNightTimeArc(cycle: StockTimesCycle) {
  const percentNight = cycle.nightTime / (cycle.dayTime + cycle.nightTime);
  const angle = percentNight * 360;

  const radius = 20;
  const centerX = 25;
  const centerY = 25;

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

  const radius = 18;
  const centerX = 25;
  const centerY = 25;

  const endX = centerX + radius * Math.cos((angle - 90) * (Math.PI / 180));
  const endY = centerY + radius * Math.sin((angle - 90) * (Math.PI / 180));

  return `M ${centerX} ${centerY} L ${endX} ${endY}`;
}

export const Clock = ({ cycle }: { cycle: StockTimesCycle }) => {
  const { currentCycle, day, timeFraction } = cycleTime(cycle);

  const [_, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <Flex align="center" gap="1">
      <Text size="2">{currentCycle === "day" ? "Day" : "Night"}</Text>
      <Text size="2">{day}</Text>
      <svg height={50} width={50}>
        <circle className={styles.baseClock} cx="25" cy="25" r="20" />
        <path className={styles.night} d={calculateNightTimeArc(cycle)} />
        <path
          className={styles.pointer}
          d={calculateClockPointer(timeFraction)}
        />
      </svg>
    </Flex>
  );
};
