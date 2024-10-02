/*
  Warnings:

  - You are about to drop the `GameState` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Player` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlayersInGame` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PlayersInGame" DROP CONSTRAINT "PlayersInGame_game_id_fkey";

-- DropForeignKey
ALTER TABLE "PlayersInGame" DROP CONSTRAINT "PlayersInGame_player_id_fkey";

-- DropTable
DROP TABLE "GameState";

-- DropTable
DROP TABLE "Player";

-- DropTable
DROP TABLE "PlayersInGame";

-- DropEnum
DROP TYPE "CurrentGameState";
