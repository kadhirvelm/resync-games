import { Flex } from "@/lib/radix";
import clsx from "clsx";
import { FishbowlActiveTracker } from "../../../../backend";
import { useTimer } from "../../utils/hooks/useTimer";
import styles from "./FishbowlTimer.module.scss";
import { PauseIcon, PlayIcon, StopCircleIcon } from "lucide-react";

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

export const LOW_TIME_THRESHOLD = 0.8;

export const FishbowlTimer = ({
  timer,
  size
}: {
  size?: number;
  timer: FishbowlActiveTracker | undefined;
}) => {
  const { timeFraction } = useTimer(timer);
  const finalSize = size ?? DEFAULT_SIZE;

  const icon = () => {
    if (timer?.state === "paused") {
      return <PauseIcon color="orange" size={finalSize / 5} />;
    }

    if (timer?.state === "stopped") {
      return <StopCircleIcon color="red" size={finalSize / 5} />;
    }

    return <PlayIcon color="green" size={finalSize / 5} />;
  };

  return (
    <>
      <Flex className={clsx(styles.background)} />
      <Flex align="center" gap="1" style={{ position: "relative" }}>
        <Flex
          style={{
            left: "50%",
            position: "absolute",
            top: "50%",
            transform: "translate(-50%, -50%)"
          }}
        >
          {icon()}
        </Flex>
        <svg height={finalSize} width={finalSize}>
          <circle
            className={clsx(styles.clock, {
              [styles.greenTime ?? ""]: timeFraction <= LOW_TIME_THRESHOLD,
              [styles.lowTime ?? ""]: timeFraction > LOW_TIME_THRESHOLD
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
