/*
  Warnings:

  - Added the required column `pos_x` to the `Tile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pos_y` to the `Tile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tile" ADD COLUMN     "pos_x" INTEGER NOT NULL,
ADD COLUMN     "pos_y" INTEGER NOT NULL;