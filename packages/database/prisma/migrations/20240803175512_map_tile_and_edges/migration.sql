-- CreateTable
CREATE TABLE "Map" (
    "map_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "starting_tile_id" TEXT NOT NULL,

    CONSTRAINT "Map_pkey" PRIMARY KEY ("map_id")
);

-- CreateTable
CREATE TABLE "Tile" (
    "tile_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "image" TEXT NOT NULL,
    "map_id" TEXT NOT NULL,

    CONSTRAINT "Tile_pkey" PRIMARY KEY ("tile_id")
);

-- CreateTable
CREATE TABLE "Edge" (
    "edge_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "flavor_text" TEXT NOT NULL,
    "to_tile_id" TEXT NOT NULL,
    "from_tile_id" TEXT NOT NULL,

    CONSTRAINT "Edge_pkey" PRIMARY KEY ("edge_id")
);

-- AddForeignKey
ALTER TABLE "Tile" ADD CONSTRAINT "Tile_map_id_fkey" FOREIGN KEY ("map_id") REFERENCES "Map"("map_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Edge" ADD CONSTRAINT "Edge_from_tile_id_fkey" FOREIGN KEY ("from_tile_id") REFERENCES "Tile"("tile_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Edge" ADD CONSTRAINT "Edge_to_tile_id_fkey" FOREIGN KEY ("to_tile_id") REFERENCES "Tile"("tile_id") ON DELETE RESTRICT ON UPDATE CASCADE;
