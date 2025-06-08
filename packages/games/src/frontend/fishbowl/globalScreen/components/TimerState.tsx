import { CircleStop, LoaderCircle } from "lucide-react";
import { useFishbowlSelector } from "../../store/fishbowlRedux";
import styles from "./TimerState.module.scss";

export const TimerState = () => {
  const timerState = useFishbowlSelector(
    (s) => s.gameStateSlice.gameState?.round?.currentActivePlayer.timer.state
  );

  if (timerState === "paused") {
    return <LoaderCircle className={styles.loader} color="orange" size={70} />;
  }

  if (timerState === "stopped") {
    return <CircleStop color="red" size={70} />;
  }
};
