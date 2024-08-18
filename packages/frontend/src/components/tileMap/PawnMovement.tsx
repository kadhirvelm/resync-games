import { ClientServiceCallers } from "@/services/serviceCallers";
import { updatePawn } from "@/stores/tiles/pawnState";
import { useTileDispatch, useTileSelector } from "@/stores/tiles/tilesStore";
import { Edge, isServiceError } from "@tiles-tbd/api";
import { Box, Button } from "grommet";
import {
  CaretDownFill,
  CaretLeftFill,
  CaretRightFill,
  CaretUpFill
} from "grommet-icons";
import styles from "./PawnMovement.module.scss";

const flavorTextToIcon = {
  DOWN: <CaretDownFill size="75px" />,
  LEFT: <CaretLeftFill size="75px" />,
  RIGHT: <CaretRightFill size="75px" />,
  UP: <CaretUpFill size="75px" />
};

const flavorTextToPosition = {
  DOWN: { bottom: 0, left: "50%", transform: "translateX(-50%)" },
  LEFT: { left: 0, top: "50%", transform: "translateY(-50%)" },
  RIGHT: { right: 0, top: "50%", transform: "translateY(-50%)" },
  UP: { left: "50%", top: 0, transform: "translateX(-50%)" }
};

export function PawnMovement() {
  const dispatch = useTileDispatch();
  const { pawnState, outboundEdges, selectedPawnId } = useTileSelector(
    (state) => state.pawnState
  );

  const selectedPawn =
    selectedPawnId !== undefined ? pawnState[selectedPawnId] : undefined;
  if (selectedPawn === undefined) {
    return;
  }

  const outboundEdgesForPawn = outboundEdges[selectedPawn.onTileId] ?? [];

  const onMovePawn = (edge: Edge) => async () => {
    const updatedPawn = await ClientServiceCallers.tileGame.movePawn({
      fromTileId: selectedPawn.onTileId,
      tilePawnId: selectedPawn.tilePawnId,
      toTileId: edge.toTileId
    });
    if (isServiceError(updatedPawn)) {
      return;
    }

    dispatch(updatePawn(updatedPawn.newPawnState));
  };

  return (
    <Box className={styles.pawnMovementContainer} flex="grow">
      {outboundEdgesForPawn.map((edge) => (
        <Button
          className={styles.movement}
          key={edge.edgeId}
          onClick={onMovePawn(edge)}
          style={
            flavorTextToPosition[
              edge.flavorText as keyof typeof flavorTextToPosition
            ]
          }
        >
          {flavorTextToIcon[edge.flavorText as keyof typeof flavorTextToIcon]}
        </Button>
      ))}
      <Box
        className={styles.colorIndicator}
        style={{ background: selectedPawn.color }}
      />
    </Box>
  );
}
