import { Edge, Tile, TileId } from "@tiles-tbd/api";
import { Box, Button } from "grommet";

export const DisplayTile = ({
  tile,
  edges,
  onTileChange
}: {
  edges: Edge[];
  onTileChange: (newTileId: TileId) => void;
  tile: Tile;
}) => {
  const updateTile = (toTileId: TileId) => () => onTileChange(toTileId);

  return (
    <Box pad="medium">
      <Box>{tile.image}</Box>
      {edges.map((edge) => (
        <Box direction="row">
          <Button
            color="purple"
            pad="medium"
            onClick={updateTile(edge.toTileId)}
          >
            {edge.flavorText}
          </Button>
        </Box>
      ))}
    </Box>
  );
};
