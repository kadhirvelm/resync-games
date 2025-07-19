import { CircleStop, LoaderCircle } from "lucide-react";
import { useFishbowlSelector } from "../../store/fishbowlRedux";
import styles from "./TimerState.module.scss";
import { useSound } from "../hooks/usePlaySound";
import { useEffect } from "react";
import { FishbowlTimer } from "../../playerComponents/timer/FishbowlTimer";

export const TimerState = () => {
  const timerState = useFishbowlSelector(
    (s) => s.gameStateSlice.gameState?.round?.currentActivePlayer.timer
  );

  const startingGun = useSound("starting-gun");
  const endTurn = useSound("end-turn");

  useEffect(() => {
    if (timerState?.state === "running") {
      startingGun.play();
    }

    if (timerState?.state === "paused") {
      endTurn.play();
    }
  }, [timerState?.state]);

  if (timerState?.state === "paused") {
    return <LoaderCircle className={styles.loader} color="orange" size={70} />;
  }

  if (timerState?.state === "stopped") {
    return <CircleStop color="red" size={70} />;
  }

  return <FishbowlTimer size={100} timer={timerState} />;
};
