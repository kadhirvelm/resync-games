import { useTileDispatch, useTileSelector } from "@/stores/tiles/tilesStore";
import { isServiceError, TilePawn } from "@tiles-tbd/api";
import { Box } from "grommet";
import styles from "./PawnMovement.module.scss";
import { ClientServiceCallers } from "@/services/serviceCallers";
import { updatePawn } from "@/stores/tiles/pawnState";

export function PawnMovement() {
  const dispatch = useTileDispatch();

  const { pawnState, outboundEdges } = useTileSelector(
    (state) => state.pawnState
  );

  const onTemporaryMovePawn = (pawn: TilePawn) => async () => {
    const nextTile = outboundEdges[pawn.onTileId][0]?.toTileId;
    const updatedPawn = await ClientServiceCallers.tileGame.movePawn({
      fromTileId: pawn.onTileId,
      tilePawnId: pawn.tilePawnId,
      toTileId: nextTile
    });
    if (isServiceError(updatedPawn)) {
      return;
    }

    dispatch(updatePawn(updatedPawn.newPawnState));
  };

  return (
    <Box className={styles.pawnMovementContainer} gap="10px">
      {Object.entries(pawnState).map(([pawnId, pawn]: [string, TilePawn]) => (
        <Box key={pawnId} onClick={onTemporaryMovePawn(pawn)}>
          {pawn.color} - {pawn.onTileId.slice(-4)}
        </Box>
      ))}
    </Box>
  );
}