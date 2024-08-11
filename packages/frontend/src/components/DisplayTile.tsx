import { Edge, Tile, TileId } from "@tiles-tbd/api";
import { Box } from "grommet";
import styles from "./DisplayTile.module.scss";
import clsx from "clsx";

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
  const thisTile = tilesIndexed[tileId];
  const outboundEdges = outboundEdgesIndexed[tileId] ?? [];

  if (visitedTiles?.[tileId]) {
    return (
      <Box className={clsx(styles.tile, styles.alreadyVisited)}>
        {thisTile.image}
      </Box>
    );
  }

  return (
    <Box gap="10px">
      <Box className={styles.tile}>{thisTile.image}</Box>
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
