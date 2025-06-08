import { CircleStop, LoaderCircle } from "lucide-react";
import { useFishbowlSelector } from "../../store/fishbowlRedux";
import styles from "./TimerState.module.scss";
import { useSound } from "../hooks/usePlaySound";
import { useEffect } from "react";

export const TimerState = () => {
  const timerState = useFishbowlSelector(
    (s) => s.gameStateSlice.gameState?.round?.currentActivePlayer.timer.state
  );

  const startingGun = useSound("starting-gun");

  useEffect(() => {
    if (timerState !== "running") {
      return;
    }

    startingGun.play();
  }, [timerState]);

  if (timerState === "paused") {
    return <LoaderCircle className={styles.loader} color="orange" size={70} />;
  }

  if (timerState === "stopped") {
    return <CircleStop color="red" size={70} />;
  }
};
