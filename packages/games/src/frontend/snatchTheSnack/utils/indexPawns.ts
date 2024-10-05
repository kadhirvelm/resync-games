import { TileId } from "@resync-games/api";
import {
  PawnId,
  SnatchTheSnackPawn
} from "../../../backend/snatch-the-snack/snatchTheSnack";

export function indexPawns(pawns: { [pawnId: PawnId]: SnatchTheSnackPawn }) {
  const pawnsByTile: { [tileId: TileId]: SnatchTheSnackPawn[] } = {};

  for (const pawn of Object.values(pawns)) {
    pawnsByTile[pawn.onTile] = pawnsByTile[pawn.onTile] ?? [];
    pawnsByTile[pawn.onTile]?.push(pawn);
  }

  return pawnsByTile;
}
