import { SlideConfirm } from "@/lib/radix";
import { FishbowlActiveTracker } from "../../../../../backend";
import { useTimer } from "../../../utils/hooks/useTimer";
import { useAdvanceWord } from "../../../stateFunctions/advanceWord";
import { useFishbowlSelector } from "../../../store/fishbowlRedux";
import { selectFishbowlPlayer } from "../../selectors/selectors";
import { LOW_TIME_THRESHOLD } from "../../timer/FishbowlTimer";

export const SomeoneGotIt = ({ timer }: { timer: FishbowlActiveTracker }) => {
  const { timeFraction } = useTimer(timer);

  const activePlayer = useFishbowlSelector(selectFishbowlPlayer);
  const maybeAdvanceWord = useAdvanceWord();

  return (
    <SlideConfirm
      confirmText="Someone got it"
      onConfirm={() => maybeAdvanceWord?.(activePlayer)}
      slideColor={timeFraction <= LOW_TIME_THRESHOLD ? "green" : "red"}
    />
  );
};
