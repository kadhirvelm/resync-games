import { DisplayText, Flex } from "@/lib/radix";
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
    return (
      <Flex align="center" flex="1" justify="center">
        <DisplayText color="gray" size="5">
          No drawing
        </DisplayText>
      </Flex>
    );
  }

  const width = window.innerWidth * 0.6;
  const height = window.innerHeight * 0.6;

  const dimension = Math.min(width, height);

  return (
    <Flex
      align="center"
      className={styles.drawing}
      flex="1"
      justify="center"
      py="2"
    >
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
