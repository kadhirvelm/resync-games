import { DisplayText, Flex } from "@/lib/radix";
import { useFishbowlSelector } from "../../store/fishbowlRedux";
import styles from "./DisplayDrawing.module.scss";
import { useRef } from "react";

export const DisplayDrawing = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const activeDrawing = useFishbowlSelector(
    (s) => s.gameStateSlice.gameState?.round?.currentActiveDrawing
  );
  const timerState = useFishbowlSelector(
    (s) => s.gameStateSlice.gameState?.round?.currentActivePlayer.timer.state
  );

  if (activeDrawing === undefined || activeDrawing.drawing === undefined) {
    return (
      <Flex align="center" flex="1" justify="center">
        <DisplayText color="gray" size="5">
          No drawing
        </DisplayText>
      </Flex>
    );
  }

  if (activeDrawing.drawing !== undefined && timerState !== "running") {
    return (
      <Flex align="center" flex="1" justify="center">
        <DisplayText color="gray" size="5">
          Waiting...
        </DisplayText>
      </Flex>
    );
  }

  return (
    <Flex
      className={styles.drawing}
      flex="1"
      justify="center"
      py="2"
      ref={containerRef}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="Drawing"
        className={styles.drawingImage}
        src={activeDrawing.drawing}
      />
    </Flex>
  );
};
