import { Edge, Tile, TileId, TilePawn } from "@tiles-tbd/api";
import { Box } from "grommet";
import styles from "./DisplayTile.module.scss";
import clsx from "clsx";
import { DisplayPawn } from "./DisplayPawn";

export const DisplayTile = ({
  tilesIndexed,
  indexedPawns,
  outboundEdgesIndexed,
  tileId,
  visitedTiles
}: {
  indexedPawns: Record<TileId, TilePawn[]>;
  outboundEdgesIndexed: Record<string, Edge[]>;
  tileId: TileId;
  tilesIndexed: Record<string, Tile>;
  visitedTiles?: Record<TileId, boolean>;
}) => {
  const thisTile = tilesIndexed[tileId];
  const outboundEdges = outboundEdgesIndexed[tileId] ?? [];
  const pawnsOnThisTile = indexedPawns[tileId] ?? [];

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
            indexedPawns={indexedPawns}
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
