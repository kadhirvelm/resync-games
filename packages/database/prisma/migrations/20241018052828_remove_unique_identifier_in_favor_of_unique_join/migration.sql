/*
  Warnings:

  - The primary key for the `PlayersInGame` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `players_in_game_identifier` on the `PlayersInGame` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[game_id,player_id]` on the table `PlayersInGame` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "PlayersInGame" DROP CONSTRAINT "PlayersInGame_pkey",
DROP COLUMN "players_in_game_identifier",
ADD CONSTRAINT "PlayersInGame_pkey" PRIMARY KEY ("game_id", "player_id");

-- CreateIndex
CREATE UNIQUE INDEX "PlayersInGame_game_id_player_id_key" ON "PlayersInGame"("game_id", "player_id");
