-- CreateEnum
CREATE TYPE "CurrentGameState" AS ENUM ('waiting', 'playing', 'finished');

-- CreateTable
CREATE TABLE "GameState" (
    "game_id" TEXT NOT NULL,
    "game_state" JSONB NOT NULL,
    "game_configuration" JSONB NOT NULL,
    "current_game_state" "CurrentGameState" NOT NULL,
    "game_type" TEXT NOT NULL,
    "version" TEXT NOT NULL,

    CONSTRAINT "GameState_pkey" PRIMARY KEY ("game_id")
);

-- CreateTable
CREATE TABLE "PlayersInGame" (
    "players_in_game_identifier" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    "player_id" TEXT NOT NULL,

    CONSTRAINT "PlayersInGame_pkey" PRIMARY KEY ("players_in_game_identifier")
);

-- CreateTable
CREATE TABLE "Player" (
    "player_id" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("player_id")
);

-- AddForeignKey
ALTER TABLE "PlayersInGame" ADD CONSTRAINT "PlayersInGame_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "GameState"("game_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayersInGame" ADD CONSTRAINT "PlayersInGame_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player"("player_id") ON DELETE RESTRICT ON UPDATE CASCADE;
