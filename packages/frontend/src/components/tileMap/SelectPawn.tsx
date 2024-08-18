import { useTileDispatch, useTileSelector } from "@/stores/tiles/tilesStore";
import { TilePawn } from "@tiles-tbd/api";
import { Box, Text } from "grommet";
import styles from "./SelectPawn.module.scss";
import { setSelectedPawn } from "@/stores/tiles/pawnState";
import { capitalize } from "lodash-es";
import { FormPreviousLink } from "grommet-icons";

export const SelectPawn = () => {
  const dispatch = useTileDispatch();

  const { selectedPawnId, pawnState } = useTileSelector(
    (state) => state.pawnState
  );

  const availablePawns = Object.values(pawnState);

  const renderSinglePawn = (pawn: TilePawn) => {
    const isSelected = selectedPawnId === pawn.tilePawnId;

    const selectPawn = () =>
      dispatch(setSelectedPawn(isSelected ? undefined : pawn.tilePawnId));

    return (
      <Box
        align="center"
        direction="row"
        key={pawn.tilePawnId}
        onClick={selectPawn}
      >
        <Box
          align="center"
          className={styles.pawnSelector}
          justify="center"
          style={{ background: pawn.color }}
        >
          <Text style={{ color: pawn.color === "yellow" ? "black" : "white" }}>
            {capitalize(pawn.color)}
          </Text>
        </Box>
        {isSelected && <FormPreviousLink size="50px" />}
      </Box>
    );
  };

  return (
    <Box className={styles.selectPawn} gap="10px">
      {availablePawns.map((pawn) => renderSinglePawn(pawn))}
    </Box>
  );
};
