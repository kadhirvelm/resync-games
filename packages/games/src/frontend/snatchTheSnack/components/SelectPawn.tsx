import styles from "./SelectPawn.module.scss";
import {
  updateSnatchTheSnackLocalState,
  useGameStateDispatch,
  useGameStateSelector
} from "../store/snatchTheSnackRedux";
import { useMemo } from "react";
import { SnatchTheSnackPawn } from "../../../backend/snatch-the-snack/snatchTheSnack";
import clsx from "clsx";
import { capitalize } from "lodash-es";
import { Crosshair1Icon } from "@radix-ui/react-icons";
import { DisplayText, Flex } from "@/lib/radix";

export const SelectPawn = () => {
  const dispatch = useGameStateDispatch();

  const maybeAvailablePawns = useGameStateSelector(
    (state) => state.gameStateSlice.gameState?.pawns
  );
  const { localState } = useGameStateSelector((state) => state.localStateSlice);

  const availablePawns = Object.values(maybeAvailablePawns ?? {});
  const sortedAvailablePawns = useMemo(() => {
    return availablePawns
      .slice()
      .sort((a, b) => a.color.localeCompare(b.color));
  }, [availablePawns]);

  if (localState === undefined || maybeAvailablePawns === undefined) {
    return;
  }

  const renderSinglePawn = (pawn: SnatchTheSnackPawn) => {
    const isSelected = localState.selectedPawn === pawn.pawnId;

    const selectPawn = () => {
      dispatch(updateSnatchTheSnackLocalState({ selectedPawn: pawn.pawnId }));
    };

    return (
      <Flex align="center" gap="2" key={pawn.pawnId} onClick={selectPawn}>
        <Flex
          align="center"
          className={clsx(styles.pawnSelector, {
            [styles.red ?? ""]: pawn.color === "red",
            [styles.yellow ?? ""]: pawn.color === "yellow",
            [styles.blue ?? ""]: pawn.color === "blue",
            [styles.green ?? ""]: pawn.color === "green"
          })}
          justify="center"
        >
          <DisplayText
            style={{ color: pawn.color === "yellow" ? "black" : "white" }}
          >
            {capitalize(pawn.color)}
          </DisplayText>
        </Flex>
        {isSelected && (
          <Crosshair1Icon className={styles.crossHair} height={30} width={30} />
        )}
      </Flex>
    );
  };

  return (
    <Flex className={styles.selectPawn} direction="column" gap="10px">
      {sortedAvailablePawns.map((pawn) => renderSinglePawn(pawn))}
    </Flex>
  );
};
