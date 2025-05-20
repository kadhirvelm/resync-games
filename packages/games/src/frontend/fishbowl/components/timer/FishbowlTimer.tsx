import { Flex } from "@/lib/radix";
import clsx from "clsx";
import { FishbowlActiveTracker } from "../../../../backend";
import { useTimer } from "../../hooks/useTimer";
import styles from "./FishbowlTimer.module.scss";

const DEFAULT_SIZE = 75;

const radius = (size: number) => size / 2 - 1;
const centerX = (size: number) => size / 2;
const centerY = (size: number) => size / 2;

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

export const FishbowlTimer = ({
  timer,
  size
}: {
  size?: number;
  timer: FishbowlActiveTracker | undefined;
}) => {
  const { timeFraction } = useTimer(timer);
  const finalSize = size ?? DEFAULT_SIZE;

  if (timer?.state === "stopped" || timer?.state === "paused") {
    return;
  }

  return (
    <>
      <Flex className={clsx(styles.background)} />
      <Flex align="center" gap="1">
        <svg height={finalSize} width={finalSize}>
          <circle
            className={clsx(styles.clock, {
              [styles.greenTime ?? ""]: timeFraction <= 0.8,
              [styles.lowTime ?? ""]: timeFraction > 0.8
            })}
            cx={centerX(finalSize)}
            cy={centerY(finalSize)}
            r={radius(finalSize)}
          />
          <path
            className={styles.pointer}
            d={calculateClockPointer(timeFraction, finalSize)}
            strokeWidth={finalSize / 20}
          />
          <path
            className={styles.pointer}
            d={calculateClockPointer(0, finalSize)}
            strokeWidth={finalSize / 15}
          />
          <circle
            cx={centerX(finalSize)}
            cy={centerY(finalSize)}
            fill="white"
            r={radius(finalSize) * 0.5}
            stroke="black"
          />
        </svg>
      </Flex>
    </>
  );
};
