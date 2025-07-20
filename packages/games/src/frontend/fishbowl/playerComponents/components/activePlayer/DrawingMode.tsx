import { PencilLineIcon } from "lucide-react";
import { DrawingBoard } from "../../../../../../lib/resync-components";
import {
  updateFishbowlGameState,
  useFishbowlDispatch,
  useFishbowlSelector
} from "../../../store/fishbowlRedux";
import {
  selectActiveRound,
  selectFishbowlPlayer
} from "../../selectors/playerSelectors";
import { Button, DisplayText, Flex } from "@/lib/radix";

export const DrawingMode = ({
  drawingMode,
  setDrawingMode
}: {
  drawingMode: boolean;
  setDrawingMode: (drawingMode: boolean) => void;
}) => {
  const dispatch = useFishbowlDispatch();

  const activePlayer = useFishbowlSelector(selectFishbowlPlayer);
  const activeRound = useFishbowlSelector(selectActiveRound);

  const onCavasChange = (dataUrl: string) => {
    if (activePlayer === undefined) {
      return;
    }

    dispatch(
      updateFishbowlGameState(
        {
          round: {
            currentActiveDrawing: {
              drawing: dataUrl,
              lastUpdatedAt: new Date().toISOString()
            }
          }
        },
        activePlayer
      )
    );
  };

  if (!drawingMode) {
    return (
      <Flex flex="1" justify="end">
        <Flex>
          <Button onClick={() => setDrawingMode(true)} variant="outline">
            <DisplayText>Drawing</DisplayText>
            <PencilLineIcon />
          </Button>
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex pr="4" style={{ maxHeight: "50vh" }}>
      <DrawingBoard
        initialDataUrl={activeRound?.currentActiveDrawing?.drawing}
        onCavasChange={onCavasChange}
      />
    </Flex>
  );
};
