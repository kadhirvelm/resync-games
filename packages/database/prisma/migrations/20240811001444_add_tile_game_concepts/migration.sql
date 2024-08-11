-- CreateTable
CREATE TABLE "TileGame" (
    "tile_game_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tile_map_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "TileGame_pkey" PRIMARY KEY ("tile_game_id")
);

-- CreateTable
CREATE TABLE "TilePawn" (
    "tile_pawn_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tile_id" TEXT NOT NULL,
    "tile_game_id" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "TilePawn_pkey" PRIMARY KEY ("tile_pawn_id")
);

-- AddForeignKey
ALTER TABLE "TileGame" ADD CONSTRAINT "TileGame_tile_map_id_fkey" FOREIGN KEY ("tile_map_id") REFERENCES "TileMap"("tile_map_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TilePawn" ADD CONSTRAINT "TilePawn_tile_id_fkey" FOREIGN KEY ("tile_id") REFERENCES "Tile"("tile_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TilePawn" ADD CONSTRAINT "TilePawn_tile_game_id_fkey" FOREIGN KEY ("tile_game_id") REFERENCES "TileGame"("tile_game_id") ON DELETE RESTRICT ON UPDATE CASCADE;
