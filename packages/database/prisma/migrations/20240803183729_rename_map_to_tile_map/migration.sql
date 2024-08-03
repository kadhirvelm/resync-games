/*
  Warnings:

  - You are about to drop the column `map_id` on the `Tile` table. All the data in the column will be lost.
  - You are about to drop the `Map` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tile_map_id` to the `Tile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tile" DROP CONSTRAINT "Tile_map_id_fkey";

-- AlterTable
ALTER TABLE "Tile" DROP COLUMN "map_id",
ADD COLUMN     "tile_map_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "Map";

-- CreateTable
CREATE TABLE "TileMap" (
    "tile_map_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "starting_tile_id" TEXT NOT NULL,

    CONSTRAINT "TileMap_pkey" PRIMARY KEY ("tile_map_id")
);

-- AddForeignKey
ALTER TABLE "Tile" ADD CONSTRAINT "Tile_tile_map_id_fkey" FOREIGN KEY ("tile_map_id") REFERENCES "TileMap"("tile_map_id") ON DELETE RESTRICT ON UPDATE CASCADE;
