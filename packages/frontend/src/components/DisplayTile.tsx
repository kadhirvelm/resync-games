import { selectPawnIndex } from "@/stores/tiles/selectPawnState";
import { useTileSelector } from "@/stores/tiles/tilesStore";
import { Edge, Tile, TileId } from "@tiles-tbd/api";
import clsx from "clsx";
import { Box } from "grommet";
import { DisplayPawn } from "./DisplayPawn";
import styles from "./DisplayTile.module.scss";

export const DisplayTile = ({
  tilesIndexed,
  outboundEdgesIndexed,
  tileId,
  visitedTiles
}: {
  outboundEdgesIndexed: Record<string, Edge[]>;
  tileId: TileId;
  tilesIndexed: Record<string, Tile>;
  visitedTiles?: Record<TileId, boolean>;
}) => {
  const pawnsIndexed = useTileSelector(selectPawnIndex);

  const thisTile = tilesIndexed[tileId];
  const outboundEdges = outboundEdgesIndexed[tileId] ?? [];
  const pawnsOnThisTile = pawnsIndexed[tileId] ?? [];

  if (visitedTiles?.[tileId]) {
    return (
      <Box className={clsx(styles.tile, styles.alreadyVisited)}>
        {thisTile.image}
      </Box>
    );
  }

  return (
    <Box gap="10px">
      <Box className={styles.tile}>
        {thisTile.image}
        <Box direction="row" gap="10px">
          {pawnsOnThisTile.map((pawn) => (
            <DisplayPawn key={pawn.tilePawnId} pawn={pawn} />
          ))}
        </Box>
      </Box>
      <Box direction="row" gap="10px">
        {outboundEdges.map((edge) => (
          <DisplayTile
            key={edge.edgeId}
            tilesIndexed={tilesIndexed}
            outboundEdgesIndexed={outboundEdgesIndexed}
            tileId={edge.toTileId}
            visitedTiles={{ ...visitedTiles, [tileId]: true }}
          />
        ))}
      </Box>
    </Box>
  );
};
