/*
  Warnings:

  - Added the required column `tile_group_id` to the `Tile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tile" ADD COLUMN     "tile_group_id" TEXT NOT NULL;
