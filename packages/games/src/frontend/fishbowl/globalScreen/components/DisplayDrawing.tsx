import { Flex } from "@/lib/radix";
import { useFishbowlSelector } from "../../store/fishbowlRedux";
import styles from "./DisplayDrawing.module.scss";

export const DisplayDrawing = () => {
  const activeDrawing = useFishbowlSelector(
    (s) => s.gameStateSlice.gameState?.round?.currentActiveDrawing
  );
  const timerState = useFishbowlSelector(
    (s) => s.gameStateSlice.gameState?.round?.currentActivePlayer.timer.state
  );

  if (
    activeDrawing === undefined ||
    activeDrawing.drawing === undefined ||
    timerState !== "running"
  ) {
    return;
  }

  const width = window.innerWidth * 0.6;
  const height = window.innerHeight * 0.6;

  const dimension = Math.min(width, height);

  return (
    <Flex className={styles.drawing}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="Drawing"
        height={dimension}
        src={activeDrawing.drawing}
        width={dimension}
      />
    </Flex>
  );
};
